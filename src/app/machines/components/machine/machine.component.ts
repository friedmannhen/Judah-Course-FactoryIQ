import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Machine } from '../../../models';
import { MachinesService } from '../../../services/machines.service';
import { CommonModule } from '@angular/common';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.scss',
})
export class MachineComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private machineService: MachinesService
  ) {}
  private sub: Subscription = new Subscription();

  machineData: Machine;
  department: string;
  ngOnInit(): void {
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.department = this.activatedRoute.snapshot.params['department'];
    this.machineData = this.machineService.getMachineData(id);

    this.sub.add(
      this.machineService
        .getMachinesData()
        .pipe(
          map((data) => {
            const depIndex = data.findIndex((department) => {
              return department.name === this.department;
            });
            const machine = data[depIndex].machines.find(
              (machine) => machine.id == id
            );
            if (machine) {
              this.machineData = machine;
            }
            return null;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public labelColorMap: { [key: string]: string } = {
    'Running': '#5CB338',
    'Under Maintenance': '#FB4141',
    'Idle': '#ecc352',
  };
}
