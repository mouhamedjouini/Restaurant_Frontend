import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavlivComponent } from './navliv.component';

describe('NavlivComponent', () => {
  let component: NavlivComponent;
  let fixture: ComponentFixture<NavlivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavlivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavlivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
