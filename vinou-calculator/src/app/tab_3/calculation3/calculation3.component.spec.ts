import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculation3Component } from './calculation3.component';

describe('Calculation3Component', () => {
  let component: Calculation3Component;
  let fixture: ComponentFixture<Calculation3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calculation3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Calculation3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
