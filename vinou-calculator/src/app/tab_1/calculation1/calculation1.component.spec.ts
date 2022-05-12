import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Calculation1Component } from './calculation1.component';

describe('Calculation1Component', () => {
  let component: Calculation1Component;
  let fixture: ComponentFixture<Calculation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Calculation1Component ],
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Calculation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
