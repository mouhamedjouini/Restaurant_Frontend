import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandeLivComponent } from './list-commande-liv.component';

describe('ListCommandeLivComponent', () => {
  let component: ListCommandeLivComponent;
  let fixture: ComponentFixture<ListCommandeLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommandeLivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCommandeLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
