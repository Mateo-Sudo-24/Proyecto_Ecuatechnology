import React from "react";
import { Clock, Users, Shield } from "lucide-react";

function Home() {
  return (
    <section
      id="inicio"
      // Se utiliza `from-background` y `to-muted` para coincidir con el ejemplo.
      className="bg-gradient-to-br from-background to-muted py-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Soluciones Tecnológicas
              {/* Se usa `text-primary` para la coherencia con el tema. */}
              <span className="text-primary block">Confiables</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Más de 15 años brindando mantenimiento preventivo y correctivo de
              equipos tecnológicos. Garantizamos la continuidad operativa de tu
              empresa con servicios rápidos y profesionales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* Se usan clases de color de Tailwind basadas en las variables del tema. */}
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 rounded-lg font-medium transition-colors">
                Solicitar Cotización
              </button>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 py-3 px-6 rounded-lg font-medium transition-colors">
                Ver Servicios
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {/* Los íconos ahora usan `text-primary`. */}
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">
                  Clientes satisfechos
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Soporte técnico</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/tecnico.jpg"
              alt="Técnico trabajando"
              className="rounded-lg shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">Garantía</div>
              <div className="text-sm">En todos nuestros servicios</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;