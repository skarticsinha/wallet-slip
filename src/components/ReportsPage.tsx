import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, TrendingDown, TrendingUp, Download } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ReportsPageProps {
  onBack: () => void;
}

const monthlyData = [
  { month: "Jul", income: 348600, expense: 125400 },
  { month: "Aug", income: 348600, expense: 138700 },
  { month: "Sep", income: 348600, expense: 142800 },
  { month: "Oct", income: 348600, expense: 128500 },
  { month: "Nov", income: 348600, expense: 156900 },
];

const categoryData = [
  { name: "Groceries", value: 45600, color: "#8B5CF6" },
  { name: "Food & Dining", value: 28400, color: "#EC4899" },
  { name: "Transport", value: 18900, color: "#F59E0B" },
  { name: "Bills", value: 35600, color: "#10B981" },
  { name: "Shopping", value: 15200, color: "#3B82F6" },
  { name: "Others", value: 13200, color: "#6B7280" },
];

const dailySpending = [
  { day: "Mon", amount: 4200 },
  { day: "Tue", amount: 3800 },
  { day: "Wed", amount: 8900 },
  { day: "Thu", amount: 2100 },
  { day: "Fri", amount: 5600 },
  { day: "Sat", amount: 12400 },
  { day: "Sun", amount: 6800 },
];

// Custom Tooltip with better styling and hover background
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Pie Chart Label with better visibility
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null; // Don't show label for very small slices

  return (
    <text 
      x={x} 
      y={y} 
      fill="hsl(var(--foreground))" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ReportsPage({ onBack }: ReportsPageProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = monthlyData.reduce((sum, item) => sum + item.expense, 0);
  const savings = totalIncome - totalExpense;
  const savingsRate = ((savings / totalIncome) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1>Reports & Analytics</h1>
          </div>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Period Selector */}
        <div className="flex gap-2">
          <Button
            variant={selectedPeriod === "week" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setSelectedPeriod("week")}
          >
            Week
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setSelectedPeriod("month")}
          >
            Month
          </Button>
          <Button
            variant={selectedPeriod === "year" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setSelectedPeriod("year")}
          >
            Year
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <div className="p-1.5 rounded-lg bg-green-500/10">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span className="text-sm text-muted-foreground">Income</span>
              </div>
              <div className="text-2xl">₹{totalIncome.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-red-600">
                <div className="p-1.5 rounded-lg bg-red-500/10">
                  <TrendingDown className="h-4 w-4" />
                </div>
                <span className="text-sm text-muted-foreground">Expenses</span>
              </div>
              <div className="text-2xl">₹{totalExpense.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-500/10">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-muted-foreground">Savings</span>
                </div>
                <span className="text-sm px-2 py-1 rounded-full bg-green-500/10 text-green-600">{savingsRate}%</span>
              </div>
              <div className="text-2xl">₹{savings.toLocaleString()}</div>
              <div className="w-full bg-accent h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${savingsRate}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Income vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                    />
                    <Bar dataKey="income" fill="#10B981" name="Income" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" fill="#EF4444" name="Expense" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Daily Spending (This Week)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={dailySpending}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 7 }}
                      name="Amount"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Expenses by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      paddingAngle={2}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div 
                            className="h-3 w-3 rounded-full ring-2 ring-offset-1 ring-offset-card"
                            style={{ backgroundColor: category.color }}
                          />
                          <span>{category.name}</span>
                        </div>
                        <span className="tabular-nums">₹{category.value.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-accent h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${(category.value / totalExpense) * 100}%`,
                            backgroundColor: category.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="circle"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expense" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      dot={{ fill: '#EF4444', r: 5, strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 7 }}
                      name="Expenses"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-blue-600">
                      <span className="mr-2">📊</span>
                      Your spending increased by 8% compared to last month
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-600">
                      <span className="mr-2">💡</span>
                      You saved {savingsRate}% of your income this month. Great job!
                    </p>
                  </div>
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <p className="text-sm text-orange-600">
                      <span className="mr-2">⚠️</span>
                      Groceries spending is 15% above your budget
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
