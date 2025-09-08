interface Lead {
  name: string;
  email: string;
  phone: string;
  property: string; // property ID
  status: string;
}

interface LeadCardProps {
  lead: Lead;
}

export default function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="border rounded-lg shadow p-4">
      <h3 className="font-bold">{lead.name}</h3>
      <p>Email: {lead.email}</p>
      <p>Phone: {lead.phone}</p>
      <p>Property ID: {lead.property}</p>
      <p>Status: {lead.status}</p>
    </div>
  );
}
