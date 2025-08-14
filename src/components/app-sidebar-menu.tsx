'use client';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import { usePathname } from 'next/navigation';
import { Box, Home, ShoppingCart, Users } from 'lucide-react';
import Link from 'next/link';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Products',
    url: '/dashboard/products',
    icon: Box,
  },
  {
    title: 'Orders',
    url: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Customers',
    url: '/dashboard/customers',
    icon: Users,
  }
];

export function AppSidebarMenuItem() {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.url === pathname}>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}
