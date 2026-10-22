import React from 'react';
import { ArrowLeft, FileText, Shield } from 'lucide-react';

interface LegalViewProps {
  type: 'terms' | 'privacy';
  onBack: () => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, onBack }) => {
  const isTerms = type === 'terms';

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-slate-800/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500">
              {isTerms ? <FileText className="w-6 h-6 text-white" /> : <Shield className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {isTerms ? 'Términos y Condiciones' : 'Política de Privacidad'}
              </h1>
              <p className="text-slate-400 mt-1">
                Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 prose prose-invert prose-slate max-w-none">
          {isTerms ? (
            <div className="space-y-8 text-slate-300">
              <section>
                <h2 className="text-xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
                <p>Al acceder y utilizar RutaFullStack, aceptas estos términos y condiciones.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-white mb-4">2. Uso de la Plataforma</h2>
                <p>Esta plataforma es para fines educativos. El contenido es propiedad de RutaFullStack.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-white mb-4">3. Cuentas de Usuario</h2>
                <p>Eres responsable de mantener la seguridad de tu cuenta y contraseña.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-white mb-4">4. Suscripciones</h2>
                <p>Los planes pagos son suscripciones renovables. Puedes cancelar en cualquier momento.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-white mb-4">5. Modificaciones</h2>
                <p>Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-slate-300">
              <section>
                <h2 className="text-xl font-bold text-white mb-4">1. Información que Recopilamos</h2>
                <p>Recopilamos nombre, email y datos de progreso para proporcionar el servicio.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-white mb-4">2. Uso de la Información</h2>
                <p>Usamos tu información para personalizar tu experiencia y mejorar la plataforma.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-white mb-4">3. Seguridad</h2>
                <p>Protegemos tus datos con encriptación y medidas de seguridad adecuadas.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-white mb-4">4. Terceros</h2>
                <p>Usamos Supabase y Stripe para autenticación y pagos, con sus propias políticas.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold text-white mb-4">5. Derechos</h2>
                <p>Puedes solicitar acceso, corrección o eliminación de tus datos en cualquier momento.</p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
