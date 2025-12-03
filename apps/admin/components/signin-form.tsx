'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { z } from 'zod';
import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/components/button';
import { Field, FieldGroup, FieldLabel } from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      // Show loading toast
      const loadingToast = toast.loading('Signing in...');

      try {
        await authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
          },
          {
            onSuccess: async () => {
              // Get session data using getSession instead of useSession hook
              const session = await authClient.getSession();

              // Dismiss loading toast
              toast.dismiss(loadingToast);

              // Check if user has admin role
              if (session?.data?.user?.role === 'admin') {
                toast.success('Signin successful');
                router.push('/');
              } else {
                toast.error('You are not authorized to access this page');
                // Sign out the user since they're not an admin
                await authClient.signOut();
              }
            },
            onError: (ctx) => {
              // Dismiss loading toast
              toast.dismiss(loadingToast);

              // Handle error with proper fallback
              const errorMessage =
                ctx.error?.message ||
                ctx.error?.statusText ||
                'Failed to sign in. Please try again.';
              toast.error(errorMessage);
            },
          },
        );
      } catch (error) {
        // Dismiss loading toast
        toast.dismiss(loadingToast);

        // Handle unexpected errors
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred';
        toast.error(errorMessage);
      }
    },
  });

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        <form.Field name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="m@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p
                  key={error?.message as string}
                  className="text-red-500 text-sm mt-1"
                >
                  {error?.message}
                </p>
              ))}
            </Field>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.map((error) => (
                <p
                  key={error?.message as string}
                  className="text-red-500 text-sm mt-1"
                >
                  {error?.message}
                </p>
              ))}
            </Field>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Field>
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </Field>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
