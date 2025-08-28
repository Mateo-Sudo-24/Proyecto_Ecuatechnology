import React from "react";
import { Monitor, Laptop, Printer, Headphones, ShoppingCart, FileText } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Mantenimiento Preventivo",
    description:
      "Mantenimiento programado de computadoras de escritorio y laptops para prevenir fallas y optimizar rendimiento.",
    features: ["Limpieza interna y externa", "Actualización de software", "Diagnóstico completo"],
  },
  {
    icon: Laptop,
    title: "Reparación de Hardware",
    description: "Diagnóstico y reparación especializada de componentes de computadoras y laptops.",
    features: ["Cambio de componentes", "Recuperación de datos", "Soldadura especializada"],
  },
  {
    icon: Printer,
    title: "Soporte de Impresoras",
    description: "Instalación, configuración y mantenimiento de impresoras empresariales y de escritorio.",
    features: ["Configuración de red", "Instalación de drivers", "Mantenimiento preventivo"],
  },
  {
    icon: Headphones,
    title: "Soporte Técnico",
    description: "Asistencia técnica remota y presencial para resolver problemas tecnológicos.",
    features: ["Soporte 24/7", "Asistencia remota", "Visitas programadas"],
  },
  {
    icon: ShoppingCart,
    title: "Venta de Repuestos",
    description: "Amplio catálogo de repuestos y accesorios tecnológicos originales y compatibles.",
    features: ["Repuestos originales", "Garantía incluida", "Entrega rápida"],
  },
  {
    icon: FileText,
    title: "Contratos Empresariales",
    description: "Planes de mantenimiento mensual y anual diseñados para empresas.",
    features: ["Planes personalizados", "Descuentos por volumen", "Prioridad en servicio"],
  },
];

function ServicesSection() {
  return (
    <section id="servicios" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-35 py-10">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-neutral mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-xl font-body text-neutral max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios tecnológicos para empresas y usuarios finales, garantizando soluciones rápidas y confiables.
          </p>
        </div>

        {/* Tarjetas de servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const bgColor =
              index % 3 === 0
                ? "bg-yellow-100"
                : index % 3 === 1
                ? "bg-blue-100"
                : "bg-red-100";
            const iconColor =
              index % 3 === 0
                ? "text-yellow-600"
                : index % 3 === 1
                ? "text-blue-600"
                : "text-red-600";
            const bulletColor =
              index % 3 === 0
                ? "bg-yellow-600"
                : index % 3 === 1
                ? "bg-blue-600"
                : "bg-red-600";

            return (
              <div
                key={index}
                className=" rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
                style={{ backgroundColor: 'var(--peach-light)' }}
              >
                {/* Icono arriba a la izquierda dentro de un cuadrado */}
                <div
                  className={`p-3 rounded-lg ${bgColor} mb-4 w-12 h-12 flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>

                <h3 className="text-xl font-heading font-semibold mb-2 text-neutral">
                  {service.title}
                </h3>
                <p className="font-body text-neutral mb-4">{service.description}</p>

                {/* Lista de características con viñetas coloreadas */}
                <ul className="space-y-2 mb-6 list-none">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm font-body text-neutral"
                    >
                      <span
                        className={`inline-block w-3 h-3 rounded-full mr-2 mt-1 ${bulletColor}`}
                      ></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;