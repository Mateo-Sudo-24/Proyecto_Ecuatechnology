import React from 'react';
import { Users, Ticket } from 'lucide-react';
import '../../styles/admin.css';

const AdminStats = () => {
  return (
    <div className="admin-content-section">
      <div className="admin-content-header">
        <h1 className="admin-content-title">Estadísticas Generales</h1>
      </div>
      
      <div className="admin-stats-container">
        {/* Tarjeta de Total Clientes */}
        <div className="admin-stat-card">
          <div className="admin-stat-content">
            <div className="admin-stat-info">
              <h3 className="admin-stat-title">Total Clientes</h3>
              <div className="admin-stat-value">45</div>
              <div className="admin-stat-change positive">+3 este mes</div>
            </div>
            <div className="admin-stat-icon clients-icon">
              <Users size={32} />
            </div>
          </div>
        </div>

        {/* Tarjeta de Tickets Generados */}
        <div className="admin-stat-card">
          <div className="admin-stat-content">
            <div className="admin-stat-info">
              <h3 className="admin-stat-title">Tickets Generados</h3>
              <div className="admin-stat-value tickets">127</div>
              <div className="admin-stat-change tickets">Total histórico</div>
            </div>
            <div className="admin-stat-icon tickets-icon">
              <Ticket size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
