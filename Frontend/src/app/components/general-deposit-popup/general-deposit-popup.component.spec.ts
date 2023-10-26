import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDepositPopupComponent } from './general-deposit-popup.component';

describe('GeneralDepositPopupComponent', () => {
  let component: GeneralDepositPopupComponent;
  let fixture: ComponentFixture<GeneralDepositPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralDepositPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDepositPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
