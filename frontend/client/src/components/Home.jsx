import React from "react";
import { Clock, Users, Shield } from "lucide-react";

function Home() {
  return (
    <section
      id="inicio"
      // Se utiliza `from-background` y `to-muted` para coincidir con el ejemplo.
      className="bg-gradient-to-br from-[oklch(1_0_0)] to-[oklch(0.96_0.01_60)] py-10 mt-[7.5rem]"
    >
      <div className="container mx-auto px-35 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 mt-15">
              Soluciones Tecnológicas
              {/* Se usa `text-primary` para la coherencia con el tema. */}
              <span className="text-[#D4A037] block">Confiables</span>
            </h1>
            <p className="text-xl text-[oklch(0.65_0_0)] mb-8 leading-relaxed">
              Más de 15 años brindando mantenimiento preventivo y correctivo de
              equipos tecnológicos. Garantizamos la continuidad operativa de tu
              empresa con servicios rápidos y profesionales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* Se usan clases de color de Tailwind basadas en las variables del tema. */}
              <button className="bg-[oklch(0.75_0.15_85)] text-[oklch(0.2_0_0)] hover:bg-[oklch(0.75_0.15_85)]/90 py-3 px-6 rounded-lg font-medium transition-colors">
                Solicitar Cotización
              </button>
              <button className="bg-[oklch(0.45_0.18_270)] text-[oklch(1_0_0)] hover:bg-[oklch(0.45_0.18_270)]/90 py-3 px-6 rounded-lg font-medium transition-colors">
                Ver Servicios
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {/* Los íconos ahora usan `text-primary`. */}
                  <Clock className="h-8 w-8 text-[oklch(0.75_0.15_85)]" />
                </div>
                <div className="text-2xl font-bold text-[oklch(0.75_0.15_85)]">
                  15+
                </div>
                <div className="text-sm text-[oklch(0.65_0_0)]">
                  Años de experiencia
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-[oklch(0.45_0.18_270)]" />
                </div>
                <div className="text-2xl font-bold text-[oklch(0.45_0.18_270)]">
                  500+
                </div>
                <div className="text-sm text-[oklch(0.65_0_0)]">
                  Clientes satisfechos
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-[oklch(0.55_0.22_25)]" />
                </div>
                <div className="text-2xl font-bold text-[oklch(0.55_0.22_25)]">
                  24/7
                </div>
                <div className="text-sm text-[oklch(0.65_0_0)]">
                  Soporte técnico
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/tecnico.jpg"
              alt="Técnico trabajando"
              className="rounded-lg shadow-2xl w-[700px] h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-[oklch(0.55_0.22_25)] text-[oklch(0.95_0_0)] p-6 rounded-lg shadow-lg">
              {/* Revisar las letras de font-family ya que no se estan aplicando  */}
              <div className="text-2xl font-extrabold drop-shadow-lg text-[oklch(1_0_0)]">
                Garantía
              </div>

              <div className="text-sm">En todos nuestros servicios</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
