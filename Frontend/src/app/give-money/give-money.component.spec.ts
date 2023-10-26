import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveMoneyComponent } from './give-money.component';

describe('GiveMoneyComponent', () => {
  let component: GiveMoneyComponent;
  let fixture: ComponentFixture<GiveMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
