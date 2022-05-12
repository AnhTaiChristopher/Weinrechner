import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { merge, Subscription } from 'rxjs'

@Component({
  selector: 'app-calculation2',
  templateUrl: './calculation2.component.html',
  styleUrls: ['./calculation2.component.css']
})
export class Calculation2Component implements OnInit, OnDestroy {

  selectedUnit: string = "g";
  selectedUnitVol: string = "l";

  calculation2Form!: FormGroup;
  subscription!:Subscription

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.calculation2Form = this.fb.group({
      "userData": new FormGroup({
        "result": new FormControl,
        "restzuckergewünscht": new FormControl((null),[Validators.required,Validators.min(1),Validators.max(100)]),
        "brix": new FormControl((null),[Validators.required,Validators.min(0.01),Validators.max(300)]),
        "weinmenge": new FormControl((null),[Validators.required,Validators.min(0.01)]),
      })
    })

    this.subscription=merge(
      this.calculation2Form.get('userData.restzuckergewünscht')!.valueChanges,
      this.calculation2Form.get('userData.brix')!.valueChanges,
      this.calculation2Form.get('userData.weinmenge')!.valueChanges,
    ).subscribe((res:any)=>{
      if(this.selectedUnitVol == "l") {
        this.calculateResultForm();
      } else if (this.selectedUnitVol == "hl") {
        this.calculateResultFormHectorLiter();
      }
   })
  }

  calculateResultForm() {
    const restzuckergewünscht=this.calculation2Form.get('userData.restzuckergewünscht')?.value
    const brix=this.calculation2Form.get('userData.brix')?.value
    const weinmenge=this.calculation2Form.get('userData.weinmenge')?.value
    this.calculation2Form.get('userData.result')?.setValue(Math.round((weinmenge*restzuckergewünscht)/(brix/100)))
    this.convert()
  }

  calculateResultFormHectorLiter() {
    const restzuckergewünscht=this.calculation2Form.get('userData.restzuckergewünscht')?.value
    const brix=this.calculation2Form.get('userData.brix')?.value
    const weinmenge=this.calculation2Form.get('userData.weinmenge')?.value
    console.log(this.calculation2Form.get('userData.result')?.value)
    this.calculation2Form.get('userData.result')?.setValue(Math.round(((weinmenge*restzuckergewünscht)/(brix/100)))*100)
    console.log(this.calculation2Form.get('userData.result')?.value)
    this.convert()
  }

  convert() {
    const result =this.calculation2Form.get('userData.result')?.value
    if(this.selectedUnit === "g" && this.calculation2Form.get('userData.result')?.value >= 10000) {
      this.selectedUnit = "kg"
      this.calculation2Form.get('userData.result')?.setValue(Math.round((result/1000)))
    } else if (this.selectedUnit === "kg" && this.calculation2Form.get('userData.result')?.value >= 10000) {
      this.calculation2Form.get('userData.result')?.setValue(Math.round((result/1000)))
    } else if (this.selectedUnit === "kg" && this.calculation2Form.get("userData.result")?.value <= 10000) {
      this.selectedUnit = "g"
      this.calculation2Form.get('userData.result')?.setValue(((result)).toFixed(1))
    }
  }

  onChangeSelectedVolume(event: any) {
    this.selectedUnitVol = event.target.value;

    if(event.target.value == "l") {
      this.calculateResultForm();
    } else if(event.target.value == "hl") {
      this.calculateResultFormHectorLiter();
    }
  }

  onChangeUnit(event: any) {
    this.selectedUnit = event.target.value;
  }

  onChangeUnitVol(event: any) {
    this.selectedUnitVol = event.target.value;
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  onSubmit() {
  }
}

