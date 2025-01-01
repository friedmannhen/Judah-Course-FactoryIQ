import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Department } from '../../models';
import { MatButtonModule } from '@angular/material/button';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  constructor(private uiService: UiService) {}
  displayedColumns: string[] = [
    'department',
    'id',
    'name',
    'stock',
    'reorderLevel',
    'status',
  ];
  dataSource: MatTableDataSource<any>;

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
  public allItems = [];

  private mapDepartmentsDataToTable(departmentsData: Department[]): void {
    const flatData = [];
    departmentsData.forEach((department) => {
      department.inventory.forEach((item) => {
        const mappeditem = {
          department: department.name,
          id: item.id,
          name: item.name,
          reorderLevel: item.reorderLevel,
          status: item.status,
          stock: item.stock,
        };
        flatData.push(mappeditem);
        if (item.status == 'Out of Stock') {
          this.uiService.openSnackBar(
            'Item: [ "' +
              item.name +
              '" , id: "' +
              item.id +
              '" ] needs restock',
            'dismiss'
          );
        }
      });
    });
    // console.log('mappeditem', flatData);
    this.allItems = flatData;
    this.dataSource = new MatTableDataSource(flatData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportToCSV(): void {
    const csvData = this.convertToCSV(this.allItems);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'inventory_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(data: any[]): string {
    const headers = [
      'Department',
      'Item Name',
      'Stock',
      'Reorder Level',
      'Status',
    ];
    const csvRows = data.map(
      (item) =>
        `${item.department},${item.name},${item.stock},${item.reorderLevel},${item.status}`
    );
    return [headers.join(','), ...csvRows].join('\n');
  }
}
