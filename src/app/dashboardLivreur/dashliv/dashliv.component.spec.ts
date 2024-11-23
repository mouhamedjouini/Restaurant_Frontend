import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashlivComponent } from './dashliv.component';

describe('DashlivComponent', () => {
  let component: DashlivComponent;
  let fixture: ComponentFixture<DashlivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashlivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashlivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
