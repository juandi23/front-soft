export interface Analytics {
  totalValue: number;
  totalOthers: number;
  totalSales: number;
  data: Record<string, unknown> | any;
  other: [];
  detail: Record<string, unknown> | any;
  type?: string;
}
