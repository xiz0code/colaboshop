export type WorkspaceRole = 'WORKSPACE_ADMIN' | 'CASHIER' | 'VIEWER';

export interface FeatureFlags {
  maxVendors: number;
  maxProducts: number;
  maxUsers: number;
  dailyEmailReportsEnabled: boolean;
  exportsEnabled: boolean;
  customCommissionEnabled: boolean;
  multiLocationEnabled: boolean;
  customBrandingEnabled: boolean;
}

export interface CreateSaleDto {
  paymentMethod: 'CASH' | 'CARD';
  items: Array<{ productId: string; quantity: number }>;
}
