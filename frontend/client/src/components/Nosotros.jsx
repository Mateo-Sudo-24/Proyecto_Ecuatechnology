import React from "react";
import "../styles/global.css";
import { Target, Eye, Award, Users } from "lucide-react";

function AboutSection() {
  return (
    <section id="nosotros" className="container mx-auto px-[8.75rem] py-20 " style={{ color: 'var(--background)', background: 'var(--darkbackground)' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ color: 'var(--neutral)' }}>
          {/* Texto principal y tarjetas Misión/Visión */}
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral mb-8">
              Sobre Ecuatecnology
            </h2>
            <p className="text-lg text-neutral mb-8 leading-relaxed">
              Con más de 15 años de experiencia en el mercado, Ecuatecnology S.A. se ha consolidado como un aliado
              estratégico para empresas que requieren un servicio técnico de calidad. Nos especializamos en el
              mantenimiento preventivo y correctivo de equipos tecnológicos.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Tarjeta Misión */}
              <div className=" border border-[oklch(0.9_0.01_60)] rounded-xl p-6 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--peach-light)' }}>
                <div className="flex flex-col  items-start gap-2 mb-4">
                  <div className=" w-12 h-12 flex  items-center justify-center rounded-lg"  style={{ color: 'var(--secondary)' }}>
                    <Target className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-neutral">Misión</h3>
                    <p className="text-sm text-neutral">
                      Brindar soluciones tecnológicas rápidas, confiables y accesibles que garanticen la continuidad
                      operativa de nuestros clientes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta Visión */}
              <div className=" border-[oklch(0.9_0.01_60)] rounded-xl p-6 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--peach-light)' }}>
                <div className="flex flex-col  items-start gap-2 mb-4">
                  <div className="bg-[oklch(0.55_0.22_25)/0.1]  w-12 h-12 flex items-center justify-center rounded-lg" style={{ color: 'var(--accent)' }}>
                    <Eye className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-neutral">Visión</h3>
                    <p className="text-sm text-neutral">
                      Ser reconocidos a nivel nacional como la empresa líder en mantenimiento y soporte tecnológico
                      integral.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen y métricas */}
          <div className="space-y-8 ">
            <img
              src="/images/oficinas.jpg"
              alt="Oficinas modernas de Ecuatecnology"
              className="rounded-lg shadow-lg w-[700px] h-[500px] object-cover mx-auto"
            />

            <div className="grid grid-cols-2 gap-6">
              {/* Métrica Años de experiencia */}
              <div className="text-center p-6  border border-[oklch(0.9_0.01_60)] rounded-xl flex flex-col items-center gap-4 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--peach-light)' }}>
                <div className=" w-12 h-12 flex items-center justify-center rounded-lg" style={{ color: 'var(--secondary)' }}>
                  <Award className="w-12 h-12" />
                </div>
                <div className="text-2xl font-bold text-neutral">15+</div>
                <div className="text-sm text-neutral">Años de experiencia</div>
              </div>

              {/* Métrica Clientes atendidos */}
              <div className="text-center p-6  border border-[oklch(0.9_0.01_60)] rounded-xl flex flex-col items-center gap-4 hover:shadow-lg transition-shadow duration-300" style={{ backgroundColor: 'var(--peach-light)' }}>
                <div className=" w-12 h-12 flex items-center justify-center rounded-lg" style={{ color: 'var(--accent)' }}>
                  <Users className="w-12 h-12" />
                </div>
                <div className="text-2xl font-bold text-neutral">500+</div>
                <div className="text-sm text-neutral">Clientes atendidos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;