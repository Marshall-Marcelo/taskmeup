import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { NewUserSchema } from '@taskmeup/shared';
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
import { useRegisterAccount } from '@/features/auth/hooks/useRegister';
import type { NewUser } from '@taskmeup/shared';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutate: createAccount, isPending: isCreatingAccount } =
    useRegisterAccount();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validators: {
      onSubmit: NewUserSchema,
    },
    onSubmit: async ({ value }) => {
      const newUser: NewUser = {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password,
      };

      console.log(newUser);

      if (isCreatingAccount) return <Spinner />;

      createAccount(newUser, {
        onSuccess: (data) => {
          toast.success(data.message);
          navigate({ to: '/login' });
        },
        onError: (data) => {
          toast.error(data.message);
        },
      });
    },
  });
  return (
    <Card className="rounded-b-none">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Join TaskMeUp Now!</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="registration-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="firstName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="John"
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
              name="lastName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Doe"
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
          <Link disabled={isCreatingAccount} to="/login">
            <span className="text-xs text-muted-foreground hover:cursor-pointer">
              Already have an account?
            </span>
          </Link>
          <div className="ml-auto flex flex-row gap-2">
            <Button
              disabled={isCreatingAccount}
              className={'px-6'}
              type="button"
              variant={'outline'}
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              disabled={isCreatingAccount}
              className={'px-6'}
              type="submit"
              form="registration-form"
            >
              Submit
            </Button>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
