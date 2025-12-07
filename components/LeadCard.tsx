interface Property {
  title?: string;
  listedBy?: string;
  price?: {
    value?: string;
    unit?: string;
  };
}

interface Lead {
  _id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  status: string;
  property: Property;
}

interface LeadCardProps {
  lead: Lead;
}

export default function LeadCard({ lead }: LeadCardProps) {
  const property = lead.property;

  return (
    <div className="border rounded-xl shadow-md p-4 bg-white">
      <h3 className="font-bold text-lg">{lead.userName}</h3>

      <div className="mt-2 text-sm">
        <p><strong>Email:</strong> {lead.userEmail}</p>
        <p><strong>Phone:</strong> {lead.userPhone}</p>
        <p><strong>Message:</strong> {lead.message}</p>

        {/* Property Details */}
        {property && (
          <div className="mt-3 p-3 rounded bg-gray-100">
            <p><strong>Property Title:</strong> {property.title}</p>

            {/* 🔥 FIX — render nested price fields safely */}
            {property.price && (
              <p>
                <strong>Price:</strong> {property.price.value} {property.price.unit}
              </p>
            )}

            {property.listedBy && (
              <p><strong>Listed By:</strong> {property.listedBy}</p>
            )}
          </div>
        )}

        <p className="mt-2">
          <strong>Status:</strong> {lead.status}
        </p>
      </div>
    </div>
  );
}
