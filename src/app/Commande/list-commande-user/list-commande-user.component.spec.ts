import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandeUserComponent } from './list-commande-user.component';

describe('ListCommandeUserComponent', () => {
  let component: ListCommandeUserComponent;
  let fixture: ComponentFixture<ListCommandeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommandeUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCommandeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
