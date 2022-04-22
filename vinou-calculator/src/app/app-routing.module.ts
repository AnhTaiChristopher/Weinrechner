import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Calculation1Component } from './tab_1/calculation1/calculation1.component';
import { Calculation2Component } from './tab_2/calculation2/calculation2.component';
import { Calculation3Component } from './tab_3/calculation3/calculation3.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'calculation1', component: Calculation1Component},
  {path: 'calculation2', component: Calculation2Component},
  {path: 'calculation3', component: Calculation3Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
