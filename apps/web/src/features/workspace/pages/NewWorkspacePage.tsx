import { useForm } from '@tanstack/react-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NewWorkspaceSchema } from '@taskmeup/shared';
import { useCreateNewWorkspace } from '@/features/workspace/hooks/useWorkspace';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useWorkspaceContext } from '@/hooks/useWorkspaceContext';

const NewWorkspacePage = () => {
  const { setWorkspaceId, setWorkspaceName } = useWorkspaceContext();
  const { mutate: createWorkspace, isPending: isCreatingWorkspace } =
    useCreateNewWorkspace();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      workspaceName: '',
    },
    validators: {
      onSubmit: NewWorkspaceSchema,
    },
    onSubmit: ({ value }) => {
      const workspaceName = value.workspaceName;

      createWorkspace(workspaceName, {
        onSuccess: (data) => {
          setWorkspaceId(data.workspace.workspaceId);
          setWorkspaceName(data.workspace.workspaceName);
          navigate({
            to: '/dashboard',
            // to: '/workspace/$workspaceId',
            // params: { workspaceId: data.workspaceId },
          });
          toast.success(data.message);
        },
        onError: (data) => {
          toast.error(data.message);
        },
      });
    },
  });
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Collaboration starts here!</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create New Workspace</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="new-workspace-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="workspaceName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Workspace Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="New Workspace"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </form>
        </CardContent>
        <CardFooter className="self-end">
          <Field orientation={'horizontal'}>
            <Button
              disabled={isCreatingWorkspace}
              className={'px-6'}
              variant={'outline'}
              onClick={() => form.reset}
            >
              Reset
            </Button>
            <Button
              disabled={isCreatingWorkspace}
              className={'px-6'}
              form="new-workspace-form"
              type="submit"
            >
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewWorkspacePage;
