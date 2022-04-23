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

  calculation2Form!: FormGroup;
  subscription!:Subscription

  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.calculation2Form = this.fb.group({
      "userData": new FormGroup({
        "result": new FormControl(null),
        "restzuckergewünscht": new FormControl(null, [Validators.required]),
        "brix": new FormControl(null, [Validators.required]),
        "weinmenge": new FormControl(null, [Validators.required]),
      })
    })
 
    this.subscription=merge(
      this.calculation2Form.get('userData.restzuckergewünscht')!.valueChanges,
      this.calculation2Form.get('userData.brix')!.valueChanges,
      this.calculation2Form.get('userData.weinmenge')!.valueChanges,
    ).subscribe((res:any)=>{
      this.calculateResultForm()
   })
   
  }
 
  calculateResultForm() {
    const restzuckergewünscht=+this.calculation2Form.get('userData.restzuckergewünscht')?.value
    const brix=+this.calculation2Form.get('userData.brix')?.value
    const weinmenge=+this.calculation2Form.get('userData.weinmenge')?.value
    this.calculation2Form.get('userData.result')?.setValue(Math.round((weinmenge*restzuckergewünscht)/(brix/100)))
  }

  onSubmit() {
    
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
     
  }

  onChangeSelectedWeight(event: any) {
    const result=+this.calculation2Form.get('userData.result')?.value

    if(event.target.value == "g") {
      this.calculation2Form.get("userData.result")?.setValue(result*1000)
    } else if(event.target.value == "kg") {
      this.calculation2Form.get("userData.result")?.setValue(result/1000)
    }
  }

  onChangeSelectedWeightVolume(event: any) {
    const result=+this.calculation2Form.get('userData.result')?.value

    if(event.target.value == "g/l") {
      this.calculation2Form.get("userData.result")?.setValue(result/1000)
    } else if(event.target.value == "kg/l") {
      this.calculation2Form.get("userData.result")?.setValue(result*1000)
    }
  }

  onChangeSelectedVolume(event: any) {
    const result=+this.calculation2Form.get('userData.result')?.value

    if(event.target.value == "l") {
      this.calculation2Form.get("userData.result")?.setValue(result/100)
    } else if(event.target.value == "hl") {
      this.calculation2Form.get("userData.result")?.setValue(result*100)
    }
  }

  onChangeUnit(event: any) {
    this.selectedUnit = event.target.value;
  }
}

