import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Department, IMachineTable } from '../../../models';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-machines-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './machines-table.component.html',
  styleUrl: './machines-table.component.scss',
})
export class MachinesTableComponent {
  displayedColumns: string[] = [
    'department',
    'machineId',
    'machineName',
    'efficiency',
    'pressure',
    'temperature',
    'status',
  ];
  dataSource: MatTableDataSource<IMachineTable>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() set departmentsData(departmentsData: Department[]) {
    this.mapDepartmentsDataToTable(departmentsData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private mapDepartmentsDataToTable(departmentsData: Department[]): void {
    /**
     * department
     * machine id
     * machine name
     * efficiency
     * pressure
     * temperature
     * status
     */

    const flatData = [];

    departmentsData.forEach((department) => {
      department.machines.forEach((machine) => {
        const mappedMachine: IMachineTable = {
          department: department.name,
          machineId: machine.id,
          machineName: machine.name,
          efficiency: machine.metrics.efficiency,
          pressure: machine.metrics.pressure,
          temperature: machine.metrics.temperature,
          status: machine.status,
        };

        flatData.push(mappedMachine);
      });
    });

    // console.log('flat data: ', flatData);
    this.dataSource = new MatTableDataSource(flatData);
  }

  constructor() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAvarageEfficiency() {
    return (
      this.dataSource.data.reduce((acc, curr) => acc + curr.efficiency, 0) /
      this.dataSource.data.length
    );
  }
  getAvarageTemprature() {
    return (
      this.dataSource.data.reduce((acc, curr) => acc + curr.temperature, 0) /
      this.dataSource.data.length
    );
  }
  getAvaragePressure() {
    return (
      this.dataSource.data.reduce((acc, curr) => acc + curr.pressure, 0) /
      this.dataSource.data.length
    );
  }
}
