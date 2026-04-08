import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { LogOutIcon } from 'lucide-react';

export function SignOut() {
  async function sign_out() {
    'use server';
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
  }
  return (
    <form action={sign_out} className="w-full">
      <SidebarMenuButton type="submit" className="cursor-pointer">
        <LogOutIcon />
        <span>Log out</span>
      </SidebarMenuButton>
    </form>
  );
}
