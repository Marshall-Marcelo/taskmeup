import { useWorkspaceContext } from '@/hooks/useWorkspaceContext';
import SelectedWorkspacePage from '@/features/workspace/pages/SelectedWorkspacePage';

const DashboardPage = () => {
  const { workspaceId } = useWorkspaceContext();

  if (!workspaceId) return <h1>If this appears there is a problem</h1>;

  return <SelectedWorkspacePage workspaceId={workspaceId} />;
};

export default DashboardPage;
