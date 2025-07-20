import { createClient } from '@supabase/supabase-js'
// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: 'bob@example.com',
    password: 'prueba123',
    options: {
      data: {
        first_name: 'John',
        last_name: 'Doe',
      }
    }
  })
  console.log(data, error);
}

signUpNewUser();
