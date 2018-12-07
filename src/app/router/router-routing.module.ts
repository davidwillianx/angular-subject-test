import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from '../pages/dash/dash.component';

const routes: Routes = [
  { path: '', redirectTo: '/dash/favorited', pathMatch: 'full' },
  { path: 'dash/:pokeType', component: DashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
