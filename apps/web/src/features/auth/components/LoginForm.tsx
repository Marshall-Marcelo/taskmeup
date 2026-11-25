import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { LoginSchema } from '@taskmeup/shared';
import type { LoginCredentials } from '@taskmeup/shared';
import { toast } from 'sonner';
import { useLoginAccount } from '@/features/auth/hooks/useLogin';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { useRouter } from '@tanstack/react-router';

const LoginForm = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const { mutateAsync: login, isPending: isLoggingIn } = useLoginAccount();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      const credentials: LoginCredentials = {
        email: value.email,
        password: value.password,
      };

      login(credentials, {
        onSuccess: async (data) => {
          await router.update({
            context: {
              user: data.user,
              isAuthenticated: data.user !== undefined,
            },
          });
          navigate({ to: '/dashboard' });
          toast(data.message);
        },
      });
    },
  });
  return (
    <Card className="rounded-b-none min-h-dvh">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>It's working time!</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="john.doe@sample.com"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="******"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation={'horizontal'}>
          <Link disabled={isLoggingIn} to="/register">
            <span className="text-xs text-muted-foreground hover:cursor-pointer">
              Don't have an account?
            </span>
          </Link>
          <div className="ml-auto flex flex-row gap-2">
            <Button
              disabled={isLoggingIn}
              className={'px-6'}
              type="button"
              variant={'outline'}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              disabled={isLoggingIn}
              className={'px-6'}
              type="submit"
              form="login-form"
            >
              Submit
            </Button>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
