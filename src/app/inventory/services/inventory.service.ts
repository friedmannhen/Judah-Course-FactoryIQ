import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor() {
    let counter = 0;
    let inter = setInterval(() => {
      if (counter == 30) clearInterval(inter);
      this.mockInventoryData();
      counter++
    }, 3);
    setInterval(() => {
      this.mockInventoryData();
    },30000);
  }

  private inventoryData$: BehaviorSubject<Department[]> = new BehaviorSubject(
    []
  );

  public getInventoryData(): Observable<Department[]> {
    return this.inventoryData$.asObservable();
  }

  // Simulated inventory data with aggressive fluctuation
  // Simulated inventory data with more realistic fluctuation
  mockInventoryData(): void {
    // Random stock generator that fluctuates realistically
    const getRandomStock = (baseStock: number, departmentId?: number) => {
      let fluctuation = Math.floor(Math.random() * 61) - 80; // Range -30 to +30

      // For the second department (Raw Materials), force stock to be low or out of stock
      if (departmentId === 2) {
        fluctuation = Math.floor(Math.random() * (baseStock - 1)); // Ensure stock will be <= reorder level
      }

      let newStock = baseStock + fluctuation;
      return Math.max(newStock, 0); // Prevent stock from going below 0
    };

    const getRandomStatus = (
      stock: number,
      reorderLevel: number
    ): 'In Stock' | 'Low Stock' | 'Out of Stock' => {
      if (stock === 0) return 'Out of Stock';
      if (stock <= reorderLevel) return 'Low Stock';
      return 'In Stock';
    };

    // Simulate inventory data for each department
    this.inventoryData$.next([
      {
        id: 1,
        name: 'Electronics',
        inventory: [
          {
            id: 101,
            name: 'Resistors',
            stock: getRandomStock(200),
            reorderLevel: 50,
            status: getRandomStatus(getRandomStock(200), 50),
          },
          {
            id: 102,
            name: 'Capacitors',
            stock: getRandomStock(150),
            reorderLevel: 30,
            status: getRandomStatus(getRandomStock(150), 30),
          },
          {
            id: 103,
            name: 'Transistors',
            stock: getRandomStock(120),
            reorderLevel: 40,
            status: getRandomStatus(getRandomStock(120), 40),
          },
        ],
      },
      {
        id: 2,
        name: 'Raw Materials',
        inventory: [
          {
            id: 201,
            name: 'Steel Sheets',
            stock: getRandomStock(300, 2),
            reorderLevel: 80,
            status: getRandomStatus(getRandomStock(300, 2), 80),
          },
          {
            id: 202,
            name: 'Plastic Granules',
            stock: getRandomStock(250, 2),
            reorderLevel: 60,
            status: getRandomStatus(getRandomStock(250, 2), 60),
          },
          {
            id: 203,
            name: 'Copper Wires',
            stock: getRandomStock(180, 2),
            reorderLevel: 50,
            status: getRandomStatus(getRandomStock(180, 2), 50),
          },
        ],
      },
      {
        id: 3,
        name: 'Finished Goods',
        inventory: [
          {
            id: 301,
            name: 'Laptops',
            stock: getRandomStock(50),
            reorderLevel: 10,
            status: getRandomStatus(getRandomStock(50), 10),
          },
          {
            id: 302,
            name: 'Smartphones',
            stock: getRandomStock(80),
            reorderLevel: 20,
            status: getRandomStatus(getRandomStock(80), 20),
          },
          {
            id: 303,
            name: 'Tablets',
            stock: getRandomStock(60),
            reorderLevel: 15,
            status: getRandomStatus(getRandomStock(60), 15),
          },
        ],
      },
      {
        id: 4,
        name: 'Spare Parts',
        inventory: [
          {
            id: 401,
            name: 'Laptop Batteries',
            stock: getRandomStock(40),
            reorderLevel: 10,
            status: getRandomStatus(getRandomStock(40), 10),
          },
          {
            id: 402,
            name: 'Phone Screens',
            stock: getRandomStock(70),
            reorderLevel: 20,
            status: getRandomStatus(getRandomStock(70), 20),
          },
          {
            id: 403,
            name: 'Tablet Covers',
            stock: getRandomStock(90),
            reorderLevel: 30,
            status: getRandomStatus(getRandomStock(90), 30),
          },
        ],
      },
      {
        id: 5,
        name: 'Consumables',
        inventory: [
          {
            id: 501,
            name: 'Printer Ink',
            stock: getRandomStock(30),
            reorderLevel: 5,
            status: getRandomStatus(getRandomStock(30), 5),
          },
          {
            id: 502,
            name: 'Paper Reams',
            stock: getRandomStock(200),
            reorderLevel: 40,
            status: getRandomStatus(getRandomStock(200), 40),
          },
          {
            id: 503,
            name: 'Packaging Tape',
            stock: getRandomStock(150),
            reorderLevel: 30,
            status: getRandomStatus(getRandomStock(150), 30),
          },
        ],
      },
    ]);
  }
}
