import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaradComponent } from './navbarad.component';

describe('NavbaradComponent', () => {
  let component: NavbaradComponent;
  let fixture: ComponentFixture<NavbaradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbaradComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbaradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
