import { Target, Eye, Award, Users } from "lucide-react";

function AboutSection() {
  return (
    <section id="nosotros" className="py-20 container mx-auto px-35">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto principal y tarjetas Misión/Visión */}
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-[oklch(0.2_0_0)] mb-8">
              Sobre Ecuatecnology
            </h2>
            <p className="text-lg text-[oklch(0.65_0_0)] mb-8 leading-relaxed">
              Con más de 15 años de experiencia en el mercado, Ecuatecnology S.A. se ha consolidado como un aliado
              estratégico para empresas que requieren un servicio técnico de calidad. Nos especializamos en el
              mantenimiento preventivo y correctivo de equipos tecnológicos.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Tarjeta Misión */}
              <div className="bg-[oklch(0.98_0.01_60)] border border-[oklch(0.9_0.01_60)] rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-[oklch(0.45_0.18_270)/0.1] text-[oklch(0.55_0.18_270)] w-12 h-12 flex items-center justify-center rounded-lg">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[oklch(0.45_0_0)]">Misión</h3>
                    <p className="text-sm text-[oklch(0.65_0_0)]">
                      Brindar soluciones tecnológicas rápidas, confiables y accesibles que garanticen la continuidad
                      operativa de nuestros clientes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Visión */}
              <div className="bg-[oklch(0.98_0.01_60)] border border-[oklch(0.9_0.01_60)] rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-[oklch(0.55_0.22_25)/0.1] text-[oklch(0.55_0.22_25)] w-12 h-12 flex items-center justify-center rounded-lg">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[oklch(0.45_0_0)]">Visión</h3>
                    <p className="text-sm text-[oklch(0.65_0_0)]">
                      Ser reconocidos a nivel nacional como la empresa líder en mantenimiento y soporte tecnológico
                      integral.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen y métricas */}
          <div className="space-y-8">
            <img
              src="/images/oficinas.jpg"
              alt="Oficinas modernas de Ecuatecnology"
              className="rounded-lg shadow-lg w-[700px] h-[500px] object-cover"
            />

            <div className="grid grid-cols-2 gap-6">
              {/* Métrica Años de experiencia */}
              <div className="text-center p-6 bg-[oklch(0.98_0.01_60)] border border-[oklch(0.9_0.01_60)] rounded-xl flex flex-col items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-[oklch(0.75_0.15_85)/0.1] text-[oklch(0.75_0.15_85)] w-12 h-12 flex items-center justify-center rounded-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-[oklch(0.2_0_0)]">15+</div>
                <div className="text-sm text-[oklch(0.65_0_0)]">Años de experiencia</div>
              </div>

              {/* Métrica Clientes atendidos */}
              <div className="text-center p-6 bg-[oklch(0.98_0.01_60)] border border-[oklch(0.9_0.01_60)] rounded-xl flex flex-col items-center gap-4 hover:shadow-lg transition-shadow duration-300">
                <div className="bg-[oklch(0.45_0.18_270)/0.1] text-[oklch(0.45_0.18_270)] w-12 h-12 flex items-center justify-center rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-[oklch(0.2_0_0)]">500+</div>
                <div className="text-sm text-[oklch(0.65_0_0)]">Clientes atendidos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
