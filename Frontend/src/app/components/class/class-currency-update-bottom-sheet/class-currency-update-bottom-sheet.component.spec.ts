import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCurrencyUpdateBottomSheetComponent } from './class-currency-update-bottom-sheet.component';

describe('ClassCurrencyUpdateBottomSheetComponent', () => {
  let component: ClassCurrencyUpdateBottomSheetComponent;
  let fixture: ComponentFixture<ClassCurrencyUpdateBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassCurrencyUpdateBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassCurrencyUpdateBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
