import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replace'})
export class ReplacePipe implements PipeTransform {
  transform(value: string, strToReplace: string, replacementStr: string): string {

    if(!value || ! strToReplace || ! replacementStr)
    {
      return value;
    }

 return value.replace(new RegExp(strToReplace, 'g'), replacementStr);
  }
}

@Component({
  selector: 'app-calculation3',
  templateUrl: './calculation3.component.html',
  styleUrls: ['./calculation3.component.css']
})
export class Calculation3Component implements OnInit, OnDestroy {

  selectedUnit: string = "kg";
  selectedUnitVol: string = "hl";

  calculation3Form!: FormGroup;
  subscription!:Subscription

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.calculation3Form = this.fb.group({
      "userData": new FormGroup({
        "result": new FormControl,
        "ausgangsmost": new FormControl((null),[Validators.required,Validators.min(1)]),
        "anreicherungsquote": new FormControl((null),[Validators.required,Validators.min(1),Validators.max(28)]),
        "zuckerungsfaktor": new FormControl((null),[Validators.required,Validators.min(0.01)]),
        "saccharose": new FormControl,
        "volumenvermehrung": new FormControl,
      })
    })

    this.subscription=merge(
      this.calculation3Form.get('userData.ausgangsmost')!.valueChanges,
      this.calculation3Form.get('userData.anreicherungsquote')!.valueChanges,
      this.calculation3Form.get('userData.zuckerungsfaktor')!.valueChanges,
    ).subscribe((res:any)=>{
      if(this.selectedUnitVol === "hl") {
        this.calculateResultForm()
      } else if (this.selectedUnitVol === "l") {
        this.calculateResultFormLiter()
      }
   })
  }

  calculateResultForm() {
    if(this.calculation3Form.get('userData.ausgangsmost')?.valid && this.calculation3Form.get('userData.anreicherungsquote')?.valid && this.calculation3Form.get('userData.zuckerungsfaktor')?.valid) {
      const ausgangsmost=this.calculation3Form.get('userData.ausgangsmost')?.value
      const anreicherungsquote=this.calculation3Form.get('userData.anreicherungsquote')?.value
      const zuckerungsfaktor=this.calculation3Form.get('userData.zuckerungsfaktor')?.value
      this.calculation3Form.get('userData.result')?.setValue(((zuckerungsfaktor/10)*anreicherungsquote*ausgangsmost).toFixed(1))
      this.calculation3Form.get('userData.volumenvermehrung')?.setValue(Math.round(zuckerungsfaktor*anreicherungsquote*ausgangsmost*0.62))
      this.selectedUnit = "kg"
      this.convert();
    }
    console.log(this.calculation3Form.get("userData.result")?.value)

  }

  calculateResultFormLiter() {
    if(this.calculation3Form.get('userData.ausgangsmost')?.valid && this.calculation3Form.get('userData.anreicherungsquote')?.valid && this.calculation3Form.get('userData.zuckerungsfaktor')?.valid) {
      const ausgangsmost=this.calculation3Form.get('userData.ausgangsmost')?.value
      const anreicherungsquote=this.calculation3Form.get('userData.anreicherungsquote')?.value
      const zuckerungsfaktor=this.calculation3Form.get('userData.zuckerungsfaktor')?.value
      this.calculation3Form.get('userData.result')?.setValue((zuckerungsfaktor*anreicherungsquote*ausgangsmost)/100)
      this.calculation3Form.get('userData.volumenvermehrung')?.setValue(Math.round((zuckerungsfaktor*anreicherungsquote*ausgangsmost*0.62)/100))
      this.selectedUnit = "kg"
      this.convert();
    }
  }

  convert() {
    const result=this.calculation3Form.get('userData.result')?.value
    console.log(result + this.selectedUnit)
    if(this.selectedUnit === "kg" && this.calculation3Form.get('userData.result')?.value < 1 ) {
      this.selectedUnit = "g"
      this.calculation3Form.get('userData.result')?.setValue((this.calculation3Form.get('userData.result')?.value*1000))
    } else if (this.selectedUnit === "g" && this.calculation3Form.get('userData.result')?.value >=1000 ) {
      this.selectedUnit = "kg"
      this.calculation3Form.get('userData.result')?.setValue((result/1000))
    }
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
    this.convert()
  }

  onChangeSelectedWeight(event: any) {
    const result=+this.calculation3Form.get('userData.result')?.value

    if(event.target.value == "g") {
      this.calculation3Form.get("userData.result")?.setValue(result*1000)
    } else if(event.target.value == "kg") {
      this.calculation3Form.get("userData.result")?.setValue(result/1000)
    }
  }

  onChangeUnit(event: any) {
    this.selectedUnit = event.target.value;
  }

  onChangeUnit2(event: any) {
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
