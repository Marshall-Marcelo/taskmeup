import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@tanstack/react-form';
import { NewTaskSchema } from '@taskmeup/shared';
import type { NewTask } from '@taskmeup/shared';
import { useWorkspaceContext } from '@/hooks/useWorkspaceContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatISO, format } from 'date-fns';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCreateNewTask } from '@/features/task';
import { toast } from 'sonner';

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewTaskDialog = ({ isDialogOpen, setIsDialogOpen }: Props) => {
  const { workspaceId } = useWorkspaceContext();
  const { mutate: createNewTask, isPending: isCreatingTask } =
    useCreateNewTask(workspaceId);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      workspaceId: workspaceId,
      taskName: '',
      taskDescription: '',
      status: 'todo',
      priority: 'low',
      dueDate: null,
    } as NewTask,
    validators: {
      onSubmit: NewTaskSchema,
    },
    onSubmit: async ({ value }) => {
      const newTask: NewTask = {
        workspaceId: value.workspaceId,
        taskName: value.taskName,
        taskDescription: value.taskDescription,
        status: value.status,
        priority: value.priority,
        dueDate: value.dueDate,
      };

      console.log(newTask);

      createNewTask(newTask, {
        onSuccess: (data) => {
          toast.success(data.message);
          form.reset();
          setIsDialogOpen(false);
        },
        onError: (data) => {
          toast.error(data.message);
        },
      });
    },
  });

  const statusItems = [
    { label: 'To-Do', value: 'todo' },
    { label: 'On Going', value: 'ongoing' },
    { label: 'In Review', value: 'review' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  const priorityItems = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        render={
          <Button className={'w-fit'} variant="outline">
            <Plus /> New Task
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <ScrollArea className={'h-125 pr-3'}>
          <form
            id="new-task-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="taskName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Task Name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="New Task"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />{' '}
              <form.Field
                name="taskDescription"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Task Description
                      </FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Task Description"
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
                name="status"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Task Status</FieldLabel>
                      <Select
                        items={statusItems}
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(value) => {
                          if (value !== null) {
                            field.handleChange(value);
                          }
                        }}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {statusItems.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="priority"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Task Priority
                      </FieldLabel>
                      <Select
                        items={priorityItems}
                        name={field.name}
                        value={field.state.value}
                        onValueChange={(value) => {
                          if (value !== null) {
                            field.handleChange(value);
                          }
                        }}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {priorityItems.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="dueDate"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Due Date</FieldLabel>
                      <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                      >
                        <PopoverTrigger
                          className={
                            'text-start bg-[#f1f3f4] px-3 py-2 rounded-3xl'
                          }
                        >
                          {field.state.value !== null
                            ? format(
                                new Date(field.state.value),
                                'MMMM d, yyyy',
                              )
                            : 'Select'}
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            id={field.name}
                            onSelect={(e) => {
                              if (e !== undefined) {
                                field.handleChange(formatISO(e));
                                setIsCalendarOpen(false);
                              }
                            }}
                            className="w-full"
                            mode="single"
                          />
                        </PopoverContent>
                      </Popover>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
          <DialogFooter className="pt-7">
            <Field className="justify-end" orientation={'horizontal'}>
              <Button
                disabled={isCreatingTask}
                className={'px-6'}
                type="button"
                variant={'outline'}
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button
                disabled={isCreatingTask}
                className={'px-6'}
                type="submit"
                form="new-task-form"
              >
                Submit
              </Button>
            </Field>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
