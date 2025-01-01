import { Component } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { Subscription } from 'rxjs';
import { Department } from '../../models';
import { InventoryService } from '../services/inventory.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartData } from 'chart.js';
import { InventoryBarComponent } from '../inventory-bar/inventory-bar.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { InventoryLineComponent } from '../inventory-line/inventory-line.component';
@Component({
  selector: 'app-inventory-dashboard',
  standalone: true,
  imports: [
    InventoryComponent,
    InventoryBarComponent,
    CommonModule,
    RouterModule,
    MatTabsModule,
    LineChartComponent,
    InventoryLineComponent,
  ],
  templateUrl: './inventory-dashboard.component.html',
  styleUrl: './inventory-dashboard.component.scss',
})
export class InventoryDashboardComponent {
  constructor(private InventoryService: InventoryService) {}

  private sub: Subscription = new Subscription();
  public departmentsData: Department[];
  public charts: Array<ChartData<'bar'>> = [];
  public name: string[] = [];
  public machinesID: string[] = [];
  public departmentName: string;
  ngOnInit() {
    this.sub.add(
      this.InventoryService.getInventoryData().subscribe((data) => {
        this.departmentsData = data;
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
