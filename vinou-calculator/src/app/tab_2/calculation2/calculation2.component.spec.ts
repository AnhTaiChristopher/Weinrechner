import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculation2Component } from './calculation2.component';

describe('Calculation2Component', () => {
  let component: Calculation2Component;
  let fixture: ComponentFixture<Calculation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calculation2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Calculation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
