import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Users, AlertTriangle, LucideIcon } from 'lucide-react';
import { getTotalSalesPrice, countOrders, getCustomers, getLowStockItems } from '@/services/orders';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

// Utility function
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Reusable Components
interface MetricCardProps {
  title: string;
  value: string | number;
  changeText: string;
  icon: LucideIcon;
  isCurrency?: boolean;
}

const MetricCard = ({
  title,
  value,
  changeText,
  icon: Icon,
  isCurrency = false
}: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {isCurrency && typeof value === 'number' ? formatCurrency(value) : value}
      </div>
      <p className="text-xs text-muted-foreground">
        {changeText}
      </p>
    </CardContent>
  </Card>
);

const DashboardHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between space-y-2">
    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
  </div>
);

export default async function DashboardPage() {
  const metrics = {
    totalSales: await getTotalSalesPrice(),
    totalOrders: await countOrders(),
    totalCustomers: await getCustomers(),
    lowStockItems: await getLowStockItems(),
  };
  return (
    <div className="w-full space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader title="Dashboard" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Sales"
          value={metrics.totalSales}
          changeText="+20.1% from last month"
          icon={DollarSign}
          isCurrency
        />
        <MetricCard
          title="Orders"
          value={metrics.totalOrders.toLocaleString()}
          changeText="+180.1% from last month"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Customers"
          value={metrics.totalCustomers.toLocaleString()}
          changeText="+19% from last month"
          icon={Users}
        />
        <MetricCard
          title="Low Stock Items"
          value={metrics.lowStockItems}
          changeText="Items need restocking"
          icon={AlertTriangle}
        />
      </div>
    </div>
  );
}
