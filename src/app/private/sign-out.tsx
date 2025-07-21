'use client';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export default function SignOut() {
  const supabase = createClient();
  function signOut() {
    supabase.auth.signOut();
    redirect('/login');
  }
  return <Button onClick={signOut}>Sign out</Button>;
}
