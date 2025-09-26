// src/components/tickets/TicketsRoutes.jsx
import { Routes, Route } from "react-router-dom";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import Proforma from "./Proforma";
import TicketInvoice from "./TicketInvoice";

export default function TicketsRoutes() {
  return (
    <Routes>
      {/* Crear un ticket */}
      <Route path="crear" element={<TicketForm />} />

      {/* Listar tickets */}
      <Route path="/" element={<TicketList />} />

      {/* Aprobar / Rechazar proforma */}
      <Route path="proforma/:ticketId" element={<Proforma />} />

      {/* Descargar / ver factura PDF */}
      <Route path="invoice/:ticketId" element={<TicketInvoiceWrapper />} />
    </Routes>
  );
}

// Wrapper para pasar ticketId desde params
import { useParams } from "react-router-dom";
function TicketInvoiceWrapper() {
  const { ticketId } = useParams();
  return <TicketInvoice ticketId={ticketId} />;
}
