import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const spendingData = [
  { date: "Oct 23", amount: 980 },
  { date: "Oct 25", amount: 1200 },
  { date: "Oct 27", amount: 1150 },
  { date: "Oct 29", amount: 1450 },
  { date: "Oct 31", amount: 1800 },
  { date: "Nov 2", amount: 1650 },
  { date: "Nov 4", amount: 1900 },
  { date: "Nov 6", amount: 2100 },
  { date: "Nov 8", amount: 1950 },
  { date: "Nov 10", amount: 1500 },
  { date: "Nov 12", amount: 1200 },
  { date: "Nov 14", amount: 900 },
  { date: "Nov 16", amount: 1100 },
  { date: "Nov 18", amount: 1350 },
  { date: "Nov 20", amount: 1450 },
  { date: "Nov 22", amount: 1300 },
];

export function SpendingChart() {
  return (
    <div className="px-4 pb-4">
      <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
        <CardContent className="p-4">
          {/* Header with Tabs */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Spending Trend</h3>
            <Tabs defaultValue="expense" className="w-auto">
              <TabsList className="h-8 bg-white">
                <TabsTrigger value="all" className="text-xs h-7 px-3">All</TabsTrigger>
                <TabsTrigger value="expense" className="text-xs h-7 px-3">Expense</TabsTrigger>
                <TabsTrigger value="income" className="text-xs h-7 px-3">Income</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Chart */}
          <div className="h-48 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={spendingData}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`₹${value}`, 'Spent']}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
