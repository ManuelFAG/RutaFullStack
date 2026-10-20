import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';
import { progressService } from '../services/progressService';
import { UserProfile, UserRole, DEMO_ACCOUNTS } from '../types/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  role: UserRole;
  isAdmin: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (
    email: string,
    pass: string,
    fullName: string,
    marketingConsent?: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithOAuth: (provider: 'google' | 'github') => Promise<{ success: boolean; error?: string }>;
  loginWithDemo: (demoKey: 'admin' | 'pro' | 'novato') => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = useCallback(async (userId: string, userEmail?: string, userMeta?: Record<string, any>) => {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('Error al cargar perfil de Supabase:', error);
      }

      if (data) {
        const mapped: UserProfile = {
          id: data.id,
          email: data.email || userEmail || '',
          fullName: data.full_name || userMeta?.full_name || '',
          avatarUrl: data.avatar_url,
          role: data.role || 'cliente_nuevo',
          funnelStatus: data.funnel_status || 'nuevo',
          objective: data.objective,
          experienceLevel: data.experience_level,
          isBlocked: Boolean(data.is_blocked),
          marketingConsent: Boolean(data.marketing_consent),
          privacyAcceptedAt: data.privacy_accepted_at || new Date().toISOString(),
          lastSeenAt: data.last_seen_at || new Date().toISOString(),
          createdAt: data.created_at || new Date().toISOString(),
          updatedAt: data.updated_at || new Date().toISOString(),
        };
        setProfile(mapped);
        return mapped;
      }

      // Si aún no se creó el perfil (por ej. trigger pendiente), crearlo
      const fallback: UserProfile = {
        id: userId,
        email: userEmail || '',
        fullName: userMeta?.full_name || '',
        role: 'cliente_nuevo',
        funnelStatus: 'nuevo',
        isBlocked: false,
        marketingConsent: false,
        privacyAcceptedAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await supabase.from('profiles').upsert({
        id: userId,
        email: userEmail,
        full_name: userMeta?.full_name || '',
        role: 'cliente_nuevo',
        funnel_status: 'nuevo',
      });

      setProfile(fallback);
      return fallback;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  }, []);

  // Inicialización y escucha de estado de sesión
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // 1. Obtener sesión activa inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email, session.user.user_metadata).then(() => {
          progressService.connectSupabaseUser(session.user.id);
        });
      }
      setLoading(false);
    });

    // 2. Suscripción a cambios en autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      const currentUser = newSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchProfile(currentUser.id, currentUser.email, currentUser.user_metadata);
        await progressService.connectSupabaseUser(currentUser.id);
      } else {
        setProfile(null);
        progressService.disconnectUser();
      }

      if (event === 'SIGNED_OUT') {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const loginWithEmail = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Supabase no está configurado' };

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        await fetchProfile(data.user.id, data.user.email, data.user.user_metadata);
        await progressService.connectSupabaseUser(data.user.id);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error de red al iniciar sesión' };
    }
  };

  const signUpWithEmail = async (
    email: string,
    pass: string,
    fullName: string,
    marketingConsent: boolean = false
  ): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Supabase no está configurado' };

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: {
            full_name: fullName.trim(),
            marketing_consent: marketingConsent,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        await fetchProfile(data.user.id, data.user.email, { full_name: fullName });
        await progressService.connectSupabaseUser(data.user.id);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al crear la cuenta' };
    }
  };

  const loginWithOAuth = async (provider: 'google' | 'github'): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Supabase no está configurado' };

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error con el proveedor OAuth' };
    }
  };

  const loginWithDemo = async (demoKey: 'admin' | 'pro' | 'novato'): Promise<{ success: boolean; error?: string }> => {
    const demo = DEMO_ACCOUNTS.find((d) => d.key === demoKey);
    if (!demo) return { success: false, error: 'Cuenta demo no encontrada' };

    return loginWithEmail(demo.email, demo.password);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (!supabase) return { success: false, error: 'Supabase no está configurado' };

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/#reset-password`,
      });

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al solicitar recuperación' };
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!supabase || !user) return { success: false, error: 'No hay sesión activa' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.fullName,
          avatar_url: updates.avatarUrl,
          objective: updates.objective,
          experience_level: updates.experienceLevel,
          marketing_consent: updates.marketingConsent,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) return { success: false, error: error.message };

      if (profile) {
        setProfile({ ...profile, ...updates });
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al actualizar perfil' };
    }
  };

  const logout = async (): Promise<void> => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    progressService.disconnectUser();
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await fetchProfile(user.id, user.email, user.user_metadata);
    }
  };

  const role: UserRole = profile?.role || 'cliente_nuevo';
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        role,
        isAdmin,
        loginWithEmail,
        signUpWithEmail,
        loginWithOAuth,
        loginWithDemo,
        resetPassword,
        updateProfile,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
