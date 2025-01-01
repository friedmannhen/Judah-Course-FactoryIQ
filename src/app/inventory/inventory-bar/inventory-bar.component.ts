import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Department } from '../../models';
import { ChartData } from 'chart.js';
import { InventoryService } from '../services/inventory.service';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-bar',
  imports: [BarChartComponent, CommonModule],
  templateUrl: './inventory-bar.component.html',
  styleUrl: './inventory-bar.component.scss',
})
export class InventoryBarComponent {
  constructor(private InventoryService: InventoryService) {}

  private sub: Subscription = new Subscription();
  // public departmentsData: Department[];
  public charts: Array<ChartData<'bar'>> = [];
  public name: string[] = [];
  public departmentName: string;
  ngOnInit() {
    this.sub.add(
      this.InventoryService.getInventoryData().subscribe(
        (data: Department[]) => {
          this.charts = [];
          data.forEach((department, index) => {
            const mappedData = {
              labels: [],
              datasets: [{ data: [], label: 'stock' }],
            };
            department.inventory.forEach((item) => {
              mappedData.labels.push(item.name);
              mappedData.datasets[0].data.push(item.stock);
            });

            this.charts.push(mappedData);
            this.name.push(`${department.name} Stock`);
          });
        }
      )
    );
  }
}
