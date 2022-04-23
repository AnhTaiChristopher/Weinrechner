import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { merge, Subscription } from 'rxjs'

@Component({
  selector: 'app-calculation3',
  templateUrl: './calculation3.component.html',
  styleUrls: ['./calculation3.component.css']
})
export class Calculation3Component implements OnInit, OnDestroy {

  selectedUnit: string = "kg";
  selectedUnit2: string = "hl";

  calculation3Form!: FormGroup;
  subscription!:Subscription

  constructor(private fb: FormBuilder) { 

  }

  ngOnInit(): void {
    this.calculation3Form = this.fb.group({
      "userData": new FormGroup({
        "result": new FormControl(null),
        "ausgangsmost": new FormControl(null, [Validators.required]),
        "anreicherungsquote": new FormControl(null, [Validators.required, Validators.max(28)]),
        "zuckerungsfaktor": new FormControl(null, [Validators.required]),
        "saccharose": new FormControl(null),
        "volumenvermehrung": new FormControl(null),
      })
    })

    this.subscription=merge(
      this.calculation3Form.get('userData.ausgangsmost')!.valueChanges,
      this.calculation3Form.get('userData.anreicherungsquote')!.valueChanges,
      this.calculation3Form.get('userData.zuckerungsfaktor')!.valueChanges,
    ).subscribe((res:any)=>{
      this.calculateResultForm()
   })

  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  calculateResultForm() {
    const ausgangsmost=this.calculation3Form.get('userData.ausgangsmost')?.value
    const anreicherungsquote=this.calculation3Form.get('userData.anreicherungsquote')?.value
    const zuckerungsfaktor=this.calculation3Form.get('userData.zuckerungsfaktor')?.value
    this.calculation3Form.get('userData.result')?.setValue((zuckerungsfaktor*anreicherungsquote*ausgangsmost).toFixed(1))
    this.calculation3Form.get('userData.volumenvermehrung')?.setValue(Math.round(zuckerungsfaktor*anreicherungsquote*ausgangsmost*0.62))
  }
 
  onChangeUnit(event: any) {
    this.selectedUnit = event.target.value;
  }

  onChangeUnit2(event: any) {
    this.selectedUnit2 = event.target.value;
  }

  onChangeSelectedVolume(event: any) {
    const result=+this.calculation3Form.get('userData.result')?.value
    const volumenvermehrung=+this.calculation3Form.get('userData.volumenvermehrung')?.value

    if (event.target.value == "hl") {
      this.calculation3Form.get("userData.result")?.setValue(result*100)
      this.calculation3Form.get("userData.volumenvermehrung")?.setValue(volumenvermehrung*100)
    } else if(event.target.value == "l") {
      this.calculation3Form.get("userData.result")?.setValue(result/100)
      this.calculation3Form.get("userData.volumenvermehrung")?.setValue(volumenvermehrung/100)
    }
  }

  onChangeSelectedWeightVolume(event: any) {
    const result=+this.calculation3Form.get('userData.result')?.value
    const volumenvermehrung=+this.calculation3Form.get('userData.volumenvermehrung')?.value

    if(event.target.value == "g/l") {
      this.calculation3Form.get("userData.result")?.setValue(result/1000)
      this.calculation3Form.get("userData.volumenvermehrung")?.setValue(volumenvermehrung/1000)
    } else if(event.target.value == "kg/l") {
      this.calculation3Form.get("userData.result")?.setValue(result*1000)
      this.calculation3Form.get("userData.volumenvermehrung")?.setValue(volumenvermehrung*1000)
    }
  }

  onChangeSelectedZuckerungsfaktor(event: any) {
    const result=+this.calculation3Form.get('userData.result')?.value
    const volumenvermehrung=+this.calculation3Form.get('userData.volumenvermehrung')?.value

    if(event.target.value == "g/l") {
      this.calculation3Form.get("userData.result")?.setValue(result/1000)
      this.calculation3Form.get("userData.volumenvermehrung")?.setValue(volumenvermehrung/1000)
    } else if(event.target.value == "kg/l") {
      this.calculation3Form.get("userData.result")?.setValue(result*1000)
      this.calculation3Form.get("userData.volumenvermehrung")?.setValue(volumenvermehrung*1000)
    }
  }

  onChangeSelectedWeight(event: any) {
    const result=+this.calculation3Form.get('userData.result')?.value

    if(event.target.value == "g") {
      this.calculation3Form.get("userData.result")?.setValue(result*1000)
    } else if(event.target.value == "kg") {
      this.calculation3Form.get("userData.result")?.setValue(result/1000)
    }
  }

  onSubmit() {

  }
}