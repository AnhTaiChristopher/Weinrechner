import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Calculation2Component } from './calculation2.component';

describe('Calculation1Component', () => {
  let component: Calculation2Component;
  let fixture: ComponentFixture<Calculation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calculation2Component ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
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
