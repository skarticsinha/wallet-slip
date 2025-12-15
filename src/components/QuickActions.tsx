import { TrendingDown, TrendingUp, Camera, BarChart3 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  const actions = [
    {
      id: "add-transaction",
      title: "Add Transaction",
      icon: TrendingDown,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-red-100 to-orange-100",
      hoverBg: "hover:shadow-md",
    },
    {
      id: "scan-receipt",
      title: "Scan Receipt",
      icon: Camera,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      hoverBg: "hover:bg-purple-50",
    },
    {
      id: "view-reports",
      title: "View Reports",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      hoverBg: "hover:bg-blue-50",
    },
  ];

  return (
    <div className="p-4">
      <h3 className="mb-4 text-muted-foreground">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <Card
            key={action.id}
            className={`cursor-pointer transition-all ${action.hoverBg} border-none shadow-sm`}
            onClick={() => onActionClick(action.id)}
          >
            <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
              <div className={`p-3 rounded-full ${action.bgColor} flex-shrink-0`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <span className="text-xs font-medium leading-tight">{action.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}