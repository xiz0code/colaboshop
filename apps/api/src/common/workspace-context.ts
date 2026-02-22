export interface WorkspaceContext {
  userId: string;
  workspaceId: string;
  role: 'WORKSPACE_ADMIN' | 'CASHIER' | 'VIEWER';
}
