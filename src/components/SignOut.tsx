'use client';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { LogOutIcon } from 'lucide-react';

export function SignOut() {
  const supabase = createClient();
  async function signOut() {
    await supabase.auth.signOut();
    redirect('/login');
  }
  return (
    <SidebarMenuButton onClick={signOut} className='cursor-pointer'>
      <LogOutIcon />
      <span>Log out</span>
    </SidebarMenuButton>
  );
}
