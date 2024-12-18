import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesDashboardComponent } from './machines-dashboard.component';

describe('MachinesDashboardComponent', () => {
  let component: MachinesDashboardComponent;
  let fixture: ComponentFixture<MachinesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MachinesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachinesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
