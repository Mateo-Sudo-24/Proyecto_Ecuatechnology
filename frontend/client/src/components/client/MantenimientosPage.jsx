import { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Calendar, MapPin, Wrench, Clock, CheckCircle, AlertTriangle } from "lucide-react";

// --- UTILITIES Y COMPONENTES SIMPLES ---

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-white text-gray-900 shadow-sm",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);

const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-gray-500", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const Button = forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-white hover:bg-primary/90",
      outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900",
      secondary: "bg-secondary text-white hover:bg-secondary/80",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-secondary text-white",
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
    />
  );
};

const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

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

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <header className="p-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </header>
  );
};

// --- CÓDIGO DE LA PÁGINA MANTENIMIENTOS ---

const maintenanceServices = [
  {
    id: 1,
    title: "Mantenimiento de Aire Acondicionado",
    description: "Limpieza y revisión completa del sistema de climatización",
    status: "completed",
    date: "2024-01-15",
    nextDate: "2024-04-15",
    location: "Oficina Principal - Piso 3",
    technician: "Juan Pérez",
    priority: "medium",
    category: "HVAC",
  },
  {
    id: 2,
    title: "Revisión Sistema Eléctrico",
    description: "Inspección de tableros y conexiones eléctricas",
    status: "scheduled",
    date: "2024-01-20",
    nextDate: "2024-01-20",
    location: "Edificio A - Sótano",
    technician: "María González",
    priority: "high",
    category: "Eléctrico",
  },
  {
    id: 3,
    title: "Mantenimiento de Ascensores",
    description: "Revisión y lubricación de mecanismos",
    status: "in-progress",
    date: "2024-01-18",
    nextDate: "2024-01-18",
    location: "Torre Principal",
    technician: "Carlos Ruiz",
    priority: "high",
    category: "Mecánico",
  },
  {
    id: 4,
    title: "Limpieza de Sistemas de Ventilación",
    description: "Limpieza de ductos y filtros de ventilación",
    status: "pending",
    date: "2024-01-25",
    nextDate: "2024-01-25",
    location: "Oficina Principal - Todos los pisos",
    technician: "Ana López",
    priority: "low",
    category: "HVAC",
  },
  {
    id: 5,
    title: "Mantenimiento de Plomería",
    description: "Revisión de tuberías y grifería",
    status: "completed",
    date: "2024-01-10",
    nextDate: "2024-07-10",
    location: "Baños - Piso 1 y 2",
    technician: "Roberto Silva",
    priority: "medium",
    category: "Plomería",
  },
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
    <div className="flex-1">
      <DashboardHeader title="Mantenimientos" subtitle="Gestiona y visualiza todos tus servicios de mantenimiento" />

      <main className="p-6">
        {/* Filtros y Búsqueda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
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
          </CardContent>
        </Card>

        {/* Lista de Servicios */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const StatusIcon = statusConfig[service.status]?.icon;
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription className="mt-1">{service.description}</CardDescription>
                    </div>
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Estado y Prioridad */}
                  <div className="flex items-center gap-2">
                    {StatusIcon && (
                      <Badge className={statusConfig[service.status].color}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig[service.status].label}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={priorityConfig[service.priority].color}
                    >
                      {priorityConfig[service.priority].label}
                    </Badge>
                  </div>

                  {/* Detalles */}
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

                  {/* Categoría */}
                  <div className="pt-2 border-t">
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Descargar Factura
                    </Button>
                    {service.status === "scheduled" && (
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Reprogramar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mensaje sin resultados */}
        {filteredServices.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron servicios</h3>
              <p className="text-gray-500">Intenta ajustar los filtros o términos de búsqueda</p>
            </CardContent>
          </Card>
        )}

        {/* Resumen de Estadísticas */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{filteredServices.length}</div>
                <div className="text-sm text-gray-500">Servicios Mostrados</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {maintenanceServices.filter((s) => s.status === "completed").length}
                </div>
                <div className="text-sm text-gray-500">Completados</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {maintenanceServices.filter((s) => s.status === "in-progress").length}
                </div>
                <div className="text-sm text-gray-500">En Progreso</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {maintenanceServices.filter((s) => s.status === "scheduled").length}
                </div>
                <div className="text-sm text-gray-500">Programados</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}