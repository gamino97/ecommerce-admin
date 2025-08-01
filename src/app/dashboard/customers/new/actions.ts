'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { schema, Customer } from '@/entities/customer';

type ActionState = {
  errors: Record<string, { message: string }>;
};

async function createCustomer(data: Customer): Promise<ActionState> {
  const { error: parseError } = schema.safeParse(data);
  const errors: ActionState['errors'] = {};
  for (const { path, message } of parseError?.issues || []) {
    errors[path.join('.')] = { message };
  }
  if(Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }
  const values = {
    first_name: String(data.firstName || ''),
    last_name: String(data.lastName || ''),
  };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInAnonymously({
    options: {
      data: values,
    }
  });
  if(error) {
    return {
      errors: {
        firstName: { message: error.message },
      },
    };
  }
  revalidatePath('/dashboard/customers', 'layout');
  redirect('/dashboard/customers');
}

export {
  createCustomer,
};
