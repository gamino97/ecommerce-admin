'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardFooter } from '@/components/ui/card';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { createCustomer } from './actions';
import { CustomerValidator, schema } from '@/entities/customer';
import Link from 'next/link';

export default function NewCustomerForm() {
  const form = useForm<CustomerValidator>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<CustomerValidator> = async (data) => {
    try {
      const { errors } = await createCustomer(data);
      if(errors) {
        Object.entries(errors).forEach(([key, value]) => {
          setError(key as keyof CustomerValidator, { message: value.message });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter customer first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter customer last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            asChild
            disabled={isSubmitting}
          >
            <Link href="/dashboard/customers">
              Cancel
            </Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
