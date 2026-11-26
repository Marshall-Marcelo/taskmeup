import { useGetWorkspaceDetails } from '@/features/workspace/hooks/useWorkspace';
import { Spinner } from '@/components/ui/spinner';

type Props = {
  workspaceId: string;
};

const SelectedWorkspacePage = ({ workspaceId }: Props) => {
  const {
    data: workspace,
    isPending,
    isError,
    isFetching,
  } = useGetWorkspaceDetails(workspaceId);

  if (isError) return <div>Forbidden</div>;
  if (isPending || isFetching) return <Spinner />;

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">{workspace?.workspaceName}</h1>
    </div>
  );
};

export default SelectedWorkspacePage;
