// src/components/client/DashboardPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Ticket, CheckCircle, Clock, AlertTriangle, Plus } from "lucide-react";


// --- UTILIDAD Y COMPONENTES SIMPLES EN EL MISMO ARCHIVO ---

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

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-[var(--primary)] text-[var(--background)] hover:bg-[var(--primary)]/90",
      outline: "border border-[var(--neutral)] bg-[var(--primary)] hover:bg-[var(--neutral)]/10 text-[var(--neutral)]",
      secondary: "bg-[var(--background)] text-[var(--neutral)] hover:bg-[var(--secondary)] hover:text-[var(--background)] ",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
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



// --- COMPONENTE PRINCIPAL DEL DASHBOARD ---

 function DashboardPage() {

  return (
    <div   className='max-w-[89.2rem]'>
      <header className="p-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-sm text-[var(--neutral)]/60">Resumen de tus servicios y actividades</p>
      </header>

      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mantenimientos Activos</CardTitle>
              <Wrench className="h-4 w-4 text-[var(--primary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">+2 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets Abiertos</CardTitle>
              <Ticket className="h-4 w-4 text-[var(--secondary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-500">3 pendientes de respuesta</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Servicios Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-gray-500">Este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximos Servicios</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-500">Esta semana</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimas actualizaciones de tus servicios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Mantenimiento de aire acondicionado completado</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
                <Badge variant="outline">Completado</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-[var(--secondary)]" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Nuevo ticket creado: Problema con calefacción</p>
                  <p className="text-xs text-gray-500">Hace 4 horas</p>
                </div>
                <Badge variant="secondary">Nuevo</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Recordatorio: Mantenimiento programado mañana</p>
                  <p className="text-xs text-gray-500">Hace 1 día</p>
                </div>
                <Badge variant="outline">Recordatorio</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Gestiona tus servicios de forma rápida</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="tickets">
                <Button className="w-full justify-start" size="lg">
                  <Plus className="mr-2 h-4 w-4 text-white" />
                  Crear Nuevo Ticket
                </Button>
              </Link>

              <Link to="mantenimientos">
                <Button variant="secondary" className="w-full justify-start" size="lg">
                  <Wrench className="mr-2 h-4 w-4 " />
                  Ver Mantenimientos
                </Button>
              </Link>

              <Link to="tickets">
                <Button variant="secondary" className="w-full justify-start" size="lg">
                  <AlertTriangle className="mr-2 h-4 w-4  " />
                  Reportar Problema
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
export default DashboardPage;