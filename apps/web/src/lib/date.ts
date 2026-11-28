import { format, differenceInCalendarDays } from 'date-fns';

type date = string | number | Date;
type nullDate = string | number | Date | null;

export function formatHumanReadableDate(date: date) {
  return format(date, 'MMMM d, yyyy');
}

export function formatDeadline(dueDate: nullDate) {
  if (!dueDate) {
    return 'No due date';
  }

  const daysRemaining = differenceInCalendarDays(dueDate, new Date());

  if (daysRemaining < 0) {
    return `Late by ${Math.abs(daysRemaining)} days`;
  }

  if (daysRemaining === 0) {
    return 'Due today';
  }

  if (daysRemaining === 1) {
    return 'Due Tomorrow';
  }

  return `Due in ${daysRemaining} days`;
}
