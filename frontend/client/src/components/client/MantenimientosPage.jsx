import { useState } from "react";
import { Search, Filter, Calendar, MapPin, Wrench, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Componente Button simplificado para este ejemplo
const Button = ({ className, children, ...props }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
      "bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

// Componente Badge simplificado
const Badge = ({ className, variant = "default", children, ...props }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-[var(--secondary)] text-[var(--background)]",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-gray-200 text-gray-800",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Componente Input simplificado
const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

// Componente Select simplificado
const Select = ({ className, children, value, onValueChange, ...props }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

// --- DATOS Y CONFIGURACIÓN ---

const maintenanceServices = [
  { id: 1, title: "Mantenimiento de Aire Acondicionado", description: "Limpieza y revisión completa del sistema de climatización", status: "completed", date: "2024-01-15", nextDate: "2024-04-15", location: "Oficina Principal - Piso 3", technician: "Juan Pérez", priority: "medium", category: "HVAC" },
  { id: 2, title: "Revisión Sistema Eléctrico", description: "Inspección de tableros y conexiones eléctricas", status: "scheduled", date: "2024-01-20", nextDate: "2024-01-20", location: "Edificio A - Sótano", technician: "María González", priority: "high", category: "Eléctrico" },
  { id: 3, title: "Mantenimiento de Ascensores", description: "Revisión y lubricación de mecanismos", status: "in-progress", date: "2024-01-18", nextDate: "2024-01-18", location: "Torre Principal", technician: "Carlos Ruiz", priority: "high", category: "Mecánico" },
  { id: 4, title: "Limpieza de Sistemas de Ventilación", description: "Limpieza de ductos y filtros de ventilación", status: "pending", date: "2024-01-25", nextDate: "2024-01-25", location: "Oficina Principal - Todos los pisos", technician: "Ana López", priority: "low", category: "HVAC" },
  { id: 5, title: "Mantenimiento de Plomería", description: "Revisión de tuberías y grifería", status: "completed", date: "2024-01-10", nextDate: "2024-07-10", location: "Baños - Piso 1 y 2", technician: "Roberto Silva", priority: "medium", category: "Plomería" },
];

const statusConfig = {
  completed: { label: "Completado", color: "bg-green-100 text-green-800", icon: CheckCircle },
  "in-progress": { label: "En Progreso", color: "bg-blue-100 text-blue-800", icon: Clock },
  scheduled: { label: "Programado", color: "bg-yellow-100 text-yellow-800", icon: Calendar },
  pending: { label: "Pendiente", color: "bg-orange-100 text-orange-800", icon: AlertTriangle },
};

const priorityConfig = {
  high: { label: "Alta", color: "bg-red-100 text-red-800" },
  medium: { label: "Media", color: "bg-yellow-100 text-yellow-800" },
  low: { label: "Baja", color: "bg-green-100 text-green-800" },
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---

export default function MantenimientosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredServices = maintenanceServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="max-w-[89.2rem]">
      <header className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Mantenimientos</h2>
          <p className="text-sm text-[var(--neutral)]/60">Gestiona y visualiza todos tus servicios de mantenimiento</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Buscar..."
            className="pl-10 w-[200px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <main className="p-6">
        {/* Filtros y Búsqueda */}
        <div className="rounded-lg border bg-white text-gray-900 shadow-sm mb-6">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros y Búsqueda
            </h3>
          </div>
          <div className="  p-6 pt-0">
            <div className=" flex gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Buscar por título, descripción o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="in-progress">En Progreso</SelectItem>
                <SelectItem value="scheduled">Programado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="HVAC">HVAC</SelectItem>
                <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                <SelectItem value="Mecánico">Mecánico</SelectItem>
                <SelectItem value="Plomería">Plomería</SelectItem>
              </Select>
            </div>
          </div>
        </div>

        {/* Lista de Servicios */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const StatusIcon = statusConfig[service.status]?.icon;
            return (
              <div key={service.id} className="rounded-lg border bg-white text-gray-900 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold leading-none tracking-tight">{service.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                    </div>
                    <Wrench className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-center gap-2">
                    {StatusIcon && (
                      <Badge className={cn(statusConfig[service.status].color)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig[service.status].label}
                      </Badge>
                    )}
                    <Badge className={cn(priorityConfig[service.priority].color)}>
                      {priorityConfig[service.priority].label}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Próximo: {new Date(service.nextDate).toLocaleDateString("es-ES")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Wrench className="h-4 w-4" />
                      <span>Técnico: {service.technician}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Descargar Factura
                    </Button>
                    {service.status === "scheduled" && (
                      <Button className="flex-1" style={{ backgroundColor: 'transparent', color: 'var(--neutral)', border: '1px solid var(--neutral)' }}>
                        Reprogramar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mensaje sin resultados */}
        {filteredServices.length === 0 && (
          <div className="rounded-lg border bg-white text-gray-900 shadow-sm text-center py-12">
            <div className="p-6 pt-0">
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron servicios</h3>
              <p className="text-gray-500">Intenta ajustar los filtros o términos de búsqueda</p>
            </div>
          </div>
        )}

        {/* Resumen de Estadísticas */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
            <div className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary)]">{filteredServices.length}</div>
                <div className="text-sm text-gray-500">Servicios Mostrados</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
            <div className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {maintenanceServices.filter((s) => s.status === "completed").length}
                </div>
                <div className="text-sm text-gray-500">Completados</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
            <div className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {maintenanceServices.filter((s) => s.status === "in-progress").length}
                </div>
                <div className="text-sm text-gray-500">En Progreso</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
            <div className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {maintenanceServices.filter((s) => s.status === "scheduled").length}
                </div>
                <div className="text-sm text-gray-500">Programados</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}