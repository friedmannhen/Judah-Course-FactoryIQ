import { InventoryItem } from './inventory.interface';
import { Machine } from './machine.interface';

export interface Department {
  id: number;
  name: string;
  machines?: Machine[];
  inventory?: InventoryItem[];
}
