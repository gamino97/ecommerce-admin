import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import SignOut from './sign-out';

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }
  return <p>Hello {data.user.email} <SignOut /></p>;
}
