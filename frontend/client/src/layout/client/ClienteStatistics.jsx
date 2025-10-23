import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, DollarSign, Activity, Users } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import useAuthStore from '../../context/storeAuth';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Card = ({ className, children }) => (
  <div className={cn("bg-white rounded-xl border border-gray-200 shadow-sm p-6", className)}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex items-center justify-between mb-4">{children}</div>
);

const CardTitle = ({ children, icon: Icon }) => (
  <h3 className="text-lg font-semibold flex items-center gap-2">
    {Icon && <Icon size={20} className="text-primary" />}
    {children}
  </h3>
);

const CardContent = ({ children }) => <div>{children}</div>;

const ClienteStatistics = () => {
  const { fetchDataBackend } = useFetch();
  const token = useAuthStore((state) => state.token);

  const [statistics, setStatistics] = useState(null);
  const [ticketStats, setTicketStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cargar estadísticas generales
        const statsData = await fetchDataBackend('clientes/statistics', null, 'GET', true);
        setStatistics(statsData.statistics);

        // Cargar estadísticas de tickets
        const ticketStatsData = await fetchDataBackend('clientes/tickets/stats', null, 'GET', true);
        setTicketStats(ticketStatsData.ticketStats);

      } catch (err) {
        setError('Error al cargar estadísticas: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadStatistics();
    }
  }, [token, fetchDataBackend]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 text-gray-800 w-full font-sans">
        <p className="text-gray-600">Cargando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 text-gray-800 w-full font-sans">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!statistics || !ticketStats) {
    return (
      <div className="p-6 bg-gray-50 text-gray-800 w-full font-sans">
        <p className="text-gray-500">No hay datos disponibles para mostrar estadísticas.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 text-gray-800 w-full font-sans">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Estadísticas</h2>
        <p className="text-gray-600">Análisis detallado de tu actividad y tickets</p>
      </div>

      {/* Información del Cliente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle icon={Users}>Información del Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Cliente:</span> {statistics.cliente.nombre}</p>
              <p><span className="font-medium">Email:</span> {statistics.cliente.email}</p>
              <p><span className="font-medium">Días como cliente:</span> {statistics.cliente.diasComoCliente} días</p>
              <p><span className="font-medium">Fecha de registro:</span> {new Date(statistics.cliente.fechaRegistro).toLocaleDateString('es-ES')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle icon={BarChart3}>Resumen General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Total de tickets:</span> {statistics.resumen.totalTickets}</p>
              <p><span className="font-medium">Proformas pendientes:</span> {statistics.resumen.proformasPendientes}</p>
              <p><span className="font-medium">Total gastado:</span> ${statistics.resumen.totalGastado.toFixed(2)}</p>
              <p><span className="font-medium">Promedio por ticket:</span> ${statistics.resumen.promedioPorTicket.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle icon={TrendingUp}>Crecimiento Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><span className="font-medium">Tickets este mes:</span> {statistics.temporales.ticketsMesActual}</p>
              <p><span className="font-medium">Tickets mes anterior:</span> {statistics.temporales.ticketsMesAnterior}</p>
              <p className={`font-medium ${statistics.temporales.crecimientoMensual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Crecimiento: {statistics.temporales.crecimientoMensual}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets por Estado */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle icon={Activity}>Tickets por Estado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(statistics.porEstado).map(([estado, count]) => (
              <div key={estado} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{count}</div>
                <div className="text-sm text-gray-600">{estado}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Proformas por Estado */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle icon={Calendar}>Estado de Proformas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(statistics.porProforma).map(([estado, count]) => (
              <div key={estado} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{count}</div>
                <div className="text-sm text-gray-600">{estado}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tickets Recientes */}
      <Card>
        <CardHeader>
          <CardTitle icon={Calendar}>Tickets Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ticketStats.ticketsRecientes.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No hay tickets recientes</p>
            ) : (
              ticketStats.ticketsRecientes.map((ticket) => (
                <div key={ticket.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Ticket #{ticket.id}</p>
                    <p className="text-sm text-gray-600">{ticket.descripcion}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{ticket.estado}</p>
                    {ticket.precio && <p className="text-sm text-green-600">${ticket.precio.toFixed(2)}</p>}
                    <p className="text-xs text-gray-500">{new Date(ticket.fecha).toLocaleDateString('es-ES')}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClienteStatistics;