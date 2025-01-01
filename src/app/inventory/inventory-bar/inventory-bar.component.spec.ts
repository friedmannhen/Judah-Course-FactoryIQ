import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBarComponent } from './inventory-bar.component';

describe('InventoryBarComponent', () => {
  let component: InventoryBarComponent;
  let fixture: ComponentFixture<InventoryBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
