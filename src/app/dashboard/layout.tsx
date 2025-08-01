import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="container md:w-[calc(100%-var(--sidebar-width))] mx-auto">
        <SidebarTrigger className='md:hidden' />
        {children}
      </main>
    </SidebarProvider>
  );
}
