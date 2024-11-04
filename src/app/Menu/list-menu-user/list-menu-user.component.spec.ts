import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenuUserComponent } from './list-menu-user.component';

describe('ListMenuUserComponent', () => {
  let component: ListMenuUserComponent;
  let fixture: ComponentFixture<ListMenuUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMenuUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMenuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
