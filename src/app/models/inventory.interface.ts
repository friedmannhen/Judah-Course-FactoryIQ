export interface InventoryItem {
  id: number;
  name: string;
  stock: number;
  reorderLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}
