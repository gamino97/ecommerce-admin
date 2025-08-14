'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { LoginFormValues } from './utils';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: LoginFormValues) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(formData);
  if (error) {
    redirect('/error');
  }
  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  const { error } = await supabase.auth.signUp(data);
  if (error) {
    redirect('/error');
  }
  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}
