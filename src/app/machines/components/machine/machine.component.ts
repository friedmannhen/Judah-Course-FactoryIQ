import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.scss',
})
export class MachineComponent {
  constructor(private activatedRoute: ActivatedRoute) {}
  machineName: string;
  department: string;
  ngOnInit(): void {
    this.machineName = this.activatedRoute.snapshot.params['machine'];
    this.department = this.activatedRoute.snapshot.params['department'];
  }
}
