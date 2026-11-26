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
    <div>
      <div>{workspace?.workspaceName}</div>
    </div>
  );
};

export default SelectedWorkspacePage;
