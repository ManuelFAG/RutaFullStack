export type UserRole = 'cliente_nuevo' | 'cliente' | 'admin';

export type FunnelStatus = 'nuevo' | 'activo' | 'en_riesgo' | 'inactivo' | 'de_pago' | 'cancelado';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  funnelStatus: FunnelStatus;
  objective?: string;
  experienceLevel?: string;
  isBlocked: boolean;
  marketingConsent: boolean;
  privacyAcceptedAt: string;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

export interface DemoAccount {
  key: 'admin' | 'pro' | 'novato';
  email: string;
  password: string;
  role: UserRole;
  name: string;
  badge: string;
  description: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    key: 'admin',
    email: 'admin@rutafullstack.com',
    password: 'Admin123!*',
    role: 'admin',
    name: 'Administrador General',
    badge: 'Admin CRM',
    description: 'Acceso total al Panel CRM, gestión de alumnos, notas y métricas.',
  },
  {
    key: 'pro',
    email: 'alumno.pro@rutafullstack.com',
    password: 'Alumno123!*',
    role: 'cliente',
    name: 'Carlos Pro Alumno',
    badge: 'Alumno Pro',
    description: 'Acceso activo a todos los módulos y sincronización en la nube.',
  },
  {
    key: 'novato',
    email: 'novato@rutafullstack.com',
    password: 'Novato123!*',
    role: 'cliente_nuevo',
    name: 'Ana Novata',
    badge: 'Nuevo Alumno',
    description: 'Rol inicial. Asciende automáticamente a Cliente al completar la 1ª lección.',
  },
];
