import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLineComponent } from './inventory-line.component';

describe('InventoryLineComponent', () => {
  let component: InventoryLineComponent;
  let fixture: ComponentFixture<InventoryLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
