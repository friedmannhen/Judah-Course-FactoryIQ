import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Department } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MachinesService {
  constructor() {
    setInterval(() => {
      this.mockMachineData();
    }, 5000);
  }

  private machinesData$: BehaviorSubject<Department[]> = new BehaviorSubject(
    []
  );

  public getMachinesData(): Observable<Department[]> {
    return this.machinesData$.asObservable();
  }

  mockMachineData(): void {
    const getRandomMetrics = (
      baseEfficiency: number,
      baseTemperature: number,
      basePressure: number
    ) => ({
      efficiency: Math.max(
        0,
        Math.min(100, baseEfficiency + Math.floor(Math.random() * 21 - 10))
      ), // Random +/- 10, clamped between 0-100
      temperature: Math.max(
        0,
        baseTemperature + Math.floor(Math.random() * 11 - 5)
      ), // Random +/- 5, no negative
      pressure: Math.max(0, basePressure + Math.floor(Math.random() * 21 - 10)), // Random +/- 10, no negative
    });

    // Helper function to get random status
    const getRandomStatus = () => {
      const statuses = ['Running', 'Idle', 'Under Maintenance'];
      return statuses[Math.floor(Math.random() * statuses.length)];
    };

    // Data structure with 5 departments
    this.machinesData$.next([
      {
        id: 1,
        name: 'Manufacturing',
        machines: [
          {
            id: 101,
            name: 'Lathe-1',
            status: getRandomStatus(),
            metrics: getRandomMetrics(85, 60, 120),
          },
          {
            id: 102,
            name: 'Lathe-2',
            status: getRandomStatus(),
            metrics: getRandomMetrics(70, 55, 110),
          },
          {
            id: 103,
            name: 'Drill-1',
            status: getRandomStatus(),
            metrics: getRandomMetrics(50, 30, 90),
          },
          {
            id: 104,
            name: 'Lathe-3',
            status: getRandomStatus(),
            metrics: getRandomMetrics(90, 65, 115),
          },
          {
            id: 105,
            name: 'Lathe-4',
            status: getRandomStatus(),
            metrics: getRandomMetrics(80, 50, 100),
          },
        ],
      },
      {
        id: 2,
        name: 'Assembly',
        machines: [
          {
            id: 201,
            name: 'Assembler-1',
            status: getRandomStatus(),
            metrics: getRandomMetrics(95, 65, 110),
          },
          {
            id: 202,
            name: 'Assembler-2',
            status: getRandomStatus(),
            metrics: getRandomMetrics(70, 55, 100),
          },
          {
            id: 203,
            name: 'Assembler-3',
            status: getRandomStatus(),
            metrics: getRandomMetrics(85, 60, 105),
          },
          {
            id: 204,
            name: 'Assembler-4',
            status: getRandomStatus(),
            metrics: getRandomMetrics(80, 50, 95),
          },
          {
            id: 205,
            name: 'Assembler-5',
            status: getRandomStatus(),
            metrics: getRandomMetrics(90, 70, 120),
          },
        ],
      },
      {
        id: 3,
        name: 'Packaging',
        machines: [
          {
            id: 301,
            name: 'Packer-1',
            status: getRandomStatus(),
            metrics: getRandomMetrics(75, 45, 100),
          },
          {
            id: 302,
            name: 'Packer-2',
            status: getRandomStatus(),
            metrics: getRandomMetrics(80, 50, 110),
          },
          {
            id: 303,
            name: 'Packer-3',
            status: getRandomStatus(),
            metrics: getRandomMetrics(85, 60, 105),
          },
          {
            id: 304,
            name: 'Packer-4',
            status: getRandomStatus(),
            metrics: getRandomMetrics(70, 55, 95),
          },
          {
            id: 305,
            name: 'Packer-5',
            status: getRandomStatus(),
            metrics: getRandomMetrics(90, 65, 120),
          },
        ],
      },
      {
        id: 4,
        name: 'Quality Control',
        machines: [
          {
            id: 401,
            name: 'Tester-1',
            status: getRandomStatus(),
            metrics: getRandomMetrics(95, 70, 110),
          },
          {
            id: 402,
            name: 'Tester-2',
            status: getRandomStatus(),
            metrics: getRandomMetrics(85, 60, 100),
          },
          {
            id: 403,
            name: 'Tester-3',
            status: getRandomStatus(),
            metrics: getRandomMetrics(90, 65, 115),
          },
          {
            id: 404,
            name: 'Tester-4',
            status: getRandomStatus(),
            metrics: getRandomMetrics(80, 55, 105),
          },
          {
            id: 405,
            name: 'Tester-5',
            status: getRandomStatus(),
            metrics: getRandomMetrics(70, 50, 95),
          },
        ],
      },
      {
        id: 5,
        name: 'Logistics',
        machines: [
          {
            id: 501,
            name: 'Loader-1',
            status: getRandomStatus(),
            metrics: getRandomMetrics(90, 60, 105),
          },
          {
            id: 502,
            name: 'Loader-2',
            status: getRandomStatus(),
            metrics: getRandomMetrics(85, 55, 100),
          },
          {
            id: 503,
            name: 'Loader-3',
            status: getRandomStatus(),
            metrics: getRandomMetrics(80, 50, 95),
          },
          {
            id: 504,
            name: 'Loader-4',
            status: getRandomStatus(),
            metrics: getRandomMetrics(75, 45, 90),
          },
          {
            id: 505,
            name: 'Loader-5',
            status: getRandomStatus(),
            metrics: getRandomMetrics(70, 40, 85),
          },
        ],
      },
    ]);
  }
}
