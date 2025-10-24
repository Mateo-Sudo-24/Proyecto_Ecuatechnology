import {
  Clock,
  Users,
  Shield,
  Monitor,
  Laptop,
  Printer,
  Headphones,
  ShoppingCart,
  FileText,
  Target,
  Eye,
  Award,
} from "lucide-react";

function Home() {
  return (
    <section
      id="home"
      style={{ color: "var(--neutral)", background: "var(--background)" }}
      className="py-10 mx-auto px-4 md:px-8 lg:px-16 font-sans w-full"
    >
      {/* Sección principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center" style={{ color: "var(--neutral)" }}>
        <div>
          <h1 className="animate-bounce text-2xl md:text-4xl lg:text-6xl font-heading font-bold text-neutral mb-6 mt-15">
            Soluciones Tecnológicas
            <span style={{ color: "var(--primary)" }} className="block">
              Confiables
            </span>
          </h1>
          <p className="text-base md:text-xl font-body text-neutral mb-8 leading-relaxed">
            Más de 15 años brindando mantenimiento preventivo y correctivo de equipos tecnológicos.
            Garantizamos la continuidad operativa de tu empresa con servicios rápidos y profesionales.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="h-6 w-6 md:h-8 md:w-8" style={{ color: "var(--primary)" }} />
              </div>
              <div className="text-xl md:text-2xl font-bold">15+</div>
              <div className="text-xs md:text-sm text-neutral">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-6 w-6 md:h-8 md:w-8" style={{ color: "var(--secondary)" }} />
              </div>
              <div className="text-xl md:text-2xl font-bold">500+</div>
              <div className="text-xs md:text-sm text-neutral">Clientes satisfechos</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Shield className="h-6 w-6 md:h-8 md:w-8" style={{ color: "var(--accent)" }} />
              </div>
              <div className="text-xl md:text-2xl font-bold">24/7</div>
              <div className="text-xs md:text-sm text-neutral">Soporte técnico</div>
            </div>
          </div>
        </div>

        {/* Imagen con garantía */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <img
            src="/images/tecnico.jpg"
            alt="Técnico trabajando"
            className="rounded-lg shadow-2xl w-full h-auto object-cover"
          />
          <div
            className="absolute -bottom-2 -left-2 p-2 rounded-lg shadow-lg"
            style={{ backgroundColor: "var(--accent)", color: "var(--background)" }}
          >
            <div className="text-sm md:text-base font-bold drop-shadow-lg">Garantía</div>
            <div className="text-xs font-body">En todos nuestros servicios</div>
          </div>
        </div>
      </div>

      {/* Sección de servicios */}
      <div
        className="container mx-auto py-10 md:py-20 font-sans px-4"
        style={{ color: "var(--neutral)", background: "var(--darkbackground)" }}
        id="servicios"
      >
        <div className="text-center mb-8 md:mb-16">
          <h2 className="transition-transform duration-300 hover:scale-110 text-2xl md:text-3xl lg:text-5xl font-heading font-bold text-neutral mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-base md:text-xl font-body text-neutral max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios tecnológicos para empresas y usuarios finales,
            garantizando soluciones rápidas y confiables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10 md:pb-20" >
          
          {[
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
              description:
                "Instalación, configuración y mantenimiento de impresoras empresariales y de escritorio.",
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
              description:
                "Amplio catálogo de repuestos y accesorios tecnológicos originales y compatibles.",
              features: ["Repuestos originales", "Garantía incluida", "Entrega rápida"],
            },
            {
              icon: FileText,
              title: "Contratos Empresariales",
              description: "Planes de mantenimiento mensual y anual diseñados para empresas.",
              features: ["Planes personalizados", "Descuentos por volumen", "Prioridad en servicio"],
            },
          ].map((service, index) => {
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
                className="rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
                style={{ backgroundColor: "var(--peach-light)" }}
              >
                <div className={`p-3 rounded-lg  ${bgColor} mb-4 w-12 h-12 flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2 text-neutral">{service.title}</h3>
                <p className="font-body text-neutral mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6 list-none">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm font-body text-neutral">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 mt-1 ${bulletColor}`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sección sobre nosotros */}
      <div className="container mx-auto px-4 mt-16 md:mt-20 lg:mt-32" id="nosotros">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center" style={{ color: "var(--neutral)" }}>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-neutral mb-8 transition-transform duration-300 hover:scale-110">Sobre Ecuatecnology</h2>
            <p className="text-base md:text-lg text-neutral mb-8 leading-relaxed">
              Con más de 15 años de experiencia en el mercado, Ecuatecnology S.A. se ha consolidado como un aliado
              estratégico para empresas que requieren un servicio técnico de calidad. Nos especializamos en el
              mantenimiento preventivo y correctivo de equipos tecnológicos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div
                className="border border-[oklch(0.9_0.01_60)] rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
                style={{ backgroundColor: "var(--peach-light)" }}
              >
                <div className="flex flex-col items-start gap-2 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg" style={{ color: "var(--secondary)" }}>
                    <Target className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2 text-neutral">Misión</h3>
                    <p className="text-xs md:text-sm text-neutral">
                      Brindar soluciones tecnológicas rápidas, confiables y accesibles que garanticen la continuidad
                      operativa de nuestros clientes.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="border border-[oklch(0.9_0.01_60)] rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
                style={{ backgroundColor: "var(--peach-light)" }}
              >
                <div className="flex flex-col items-start gap-2 mb-4">
                  <div className="bg-[oklch(0.55_0.22_25)/0.1] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg" style={{ color: "var(--accent)" }}>
                    <Eye className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2 text-neutral">Visión</h3>
                    <p className="text-xs md:text-sm text-neutral">
                      Ser reconocidos a nivel nacional como la empresa líder en mantenimiento y soporte tecnológico integral.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <img
              src="/images/oficinas.jpg"
              alt="Oficinas modernas de Ecuatecnology"
              className="rounded-lg shadow-lg w-full h-auto object-cover mx-auto max-w-sm md:max-w-md lg:max-w-lg"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div
                className="text-center p-4 md:p-6 border border-[oklch(0.9_0.01_60)] rounded-xl flex flex-col items-center gap-4 hover:shadow-lg transition-shadow duration-300"
                style={{ backgroundColor: "var(--peach-light)" }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg" style={{ color: "var(--secondary)" }}>
                  <Award className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-neutral">15+</div>
                <div className="text-xs md:text-sm text-neutral">Años de experiencia</div>
              </div>
              <div
                className="text-center p-4 md:p-6 border border-[oklch(0.9_0.01_60)] rounded-xl flex flex-col items-center gap-4 hover:shadow-lg transition-shadow duration-300"
                style={{ backgroundColor: "var(--peach-light)" }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg" style={{ color: "var(--accent)" }}>
                  <Users className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-neutral">500+</div>
                <div className="text-xs md:text-sm text-neutral">Clientes atendidos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
