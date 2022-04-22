import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-calculation1',
  templateUrl: './calculation1.component.html',
  styleUrls: ['./calculation1.component.css']
})
export class Calculation1Component implements OnInit {

  selectedUnit: string = "";
  calculation1Form!: FormGroup;

  constructor(private fb: FormBuilder) { 

  }

  ngOnInit(): void {
    this.calculation1Form = this.fb.group({
      "userData": new FormGroup({
          "eingabe": new FormControl(null, [Validators.required, Validators.min(1)]),
          "oechsle": new FormControl(null),
          "kmw": new FormControl(null),
          "sugar_weight_vol": new FormControl(null),
          "alcohol_weight_vol": new FormControl(null),
          "alcohol_vol": new FormControl(null),
        }),
    })
  }

  calculateResultForm() {
    const eingabe = (this.calculation1Form.get('userData.eingabe')?.value)

    this.calculation1Form.get('userData.oechsle')?.setValue(eingabe)
    this.calculation1Form.get('userData.kmw')?.setValue(eingabe/4,86)
    this.calculation1Form.get('userData.sugar_weight_vol')?.setValue(eingabe*2,5-22)
    const sugar_weight_vol = (this.calculation1Form.get('userData.sugar_weight_vol')?.value)
    this.calculation1Form.get('userData.alcohol_weight_vol')?.setValue(sugar_weight_vol/2)
    const alcohol_weight_vol = (this.calculation1Form.get('userData.alcohol_weight_vol')?.value)
    this.calculation1Form.get('userData.alcohol_vol')?.setValue((alcohol_weight_vol/7.8).toFixed(1))
  }

  calculateResultFormSugarWeightVol() {
    const eingabe = (this.calculation1Form.get('userData.eingabe')?.value)
   
    this.calculation1Form.get('userData.sugar_weight_vol')?.setValue(eingabe)
    const sugar_weight_vol = (this.calculation1Form.get('userData.sugar_weight_vol')?.value)
    this.calculation1Form.get('userData.alcohol_weight_vol')?.setValue(eingabe/2)
    const alcohol_weight_vol = (this.calculation1Form.get('userData.alcohol_weight_vol')?.value)
    this.calculation1Form.get('userData.alcohol_vol')?.setValue((alcohol_weight_vol/7.8).toFixed(1))
    this.calculation1Form.get('userData.oechsle')?.setValue(Math.round((sugar_weight_vol*0.4)+8.8))
    const oechsle = (this.calculation1Form.get('userData.oechsle')?.value)
    this.calculation1Form.get('userData.kmw')?.setValue(oechsle/4,86)
  }

  calculateResultFormAlcoholWeightVol() {

  }

  calculateResultFormAlcoholVol() {

  }

  onChangeSelected(event: any) {
    if(event.target.value == "oechsle") {
      this.calculateResultForm();
    } else if (event.target.value == "sugar_weight_vol") {
      this.calculateResultFormSugarWeightVol();
    } else if (event.target.value == "alcohol_weight_vol") {
      this.calculateResultFormAlcoholWeightVol();
    } else if (event.target.value == "alcohol_vol") {
      this.calculateResultFormAlcoholVol();
    }
  }

  onSubmit() {

  }
}
