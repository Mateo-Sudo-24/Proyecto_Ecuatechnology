import React from "react";
import { Clock, Users, Shield } from "lucide-react";


function Home() {

  return (
    <section
      id="inicio"
      className="bg-gradient-to-br from-gray-50 to-gray-200 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Soluciones Tecnológicas
              <span className="text-[#d4a017] block">Confiables</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Más de 15 años brindando mantenimiento preventivo y correctivo de
              equipos tecnológicos. Garantizamos la continuidad operativa de tu
              empresa con servicios rápidos y profesionales.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="#D4AF37 text-black hover:bg-yellow-600 py-3 px-6 rounded-lg font-medium transition-colors">
                Solicitar Cotización
              </button>
              <button className="bg-blue-500 text-black hover:bg-blue-600 py-3 px-6 rounded-lg font-medium transition-colors">
                Ver Servicios
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="h-8 w-8 text-[#d4a017]" />
                </div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-[#3b42f6]" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">
                  Clientes satisfechos
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Soporte técnico</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/tecnico.jpg"
              alt="Técnico trabajando"
              className="rounded-lg shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-6 rounded-lg shadow-lg">
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
