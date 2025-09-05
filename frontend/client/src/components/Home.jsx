import React from "react";
import "../styles/global.css";
import { Clock, Users, Shield } from "lucide-react";

function Home() {
  return (
    <section
      id="home"
      // Se usa la variable CSS directamente en un estilo en línea
      style={{ color: 'var(--neutral)', background: 'var(--background)' }}
      className="py-10 mt-[6.1rem]  mx-auto px-[8.75rem] font-sans w-full"
    >
      
        <div className="grid lg:grid-cols-2 gap-12 items-center" style={{ color: 'var(--neutral)' }}>
          <div>
            {/* Los estilos de fuente y color se aplican con clases o directamente */}
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-neutral mb-6 mt-15">
              Soluciones Tecnológicas
              <span style={{ color: 'var(--primary)' }} className="block">Confiables</span>
            </h1>
            <p className="text-xl font-body text-neutral mb-8 leading-relaxed">
              Más de 15 años brindando mantenimiento preventivo y correctivo de
              equipos tecnológicos. Garantizamos la continuidad operativa de tu
              empresa con servicios rápidos y profesionales.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="h-8 w-8" style={{ color: 'var(--primary)' }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--neutral)' }}>
                  15+
                </div>
                <div className="text-sm text-neutral">
                  Años de experiencia
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8" style={{ color: 'var(--secondary)' }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--neutral)' }}>
                  500+
                </div>
                <div className="text-sm text-neutral">
                  Clientes satisfechos
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8" style={{ color: 'var(--accent)' }} />
                </div>
                <div className="text-2xl font-bold" style={{ color: 'var(--neutral)' }}>
                  24/7
                </div>
                <div className="text-sm text-neutral">
                  Soporte técnico
                </div>
              </div>
            </div>
          </div>

          <div className=" relative mx-auto">
            <img
              src="/images/tecnico.jpg"
              alt="Técnico trabajando"
              className="rounded-lg shadow-2xl w-[700px] h-[500px] object-cover "
            />
            <div className="absolute -bottom-6 -left-6   p-6 rounded-lg shadow-lg" style={{ backgroundColor: 'var(--accent)' , color: 'var(--background)' }}>
              <div className="text-2xl font-bold drop-shadow-lg  " style={{ color: 'var(--background)' }}>
                Garantía
              </div>
              <div className="text-sm font-body">En todos nuestros servicios</div>
            </div>
          </div>
        </div>
      
    </section>
  );
}

export default Home;