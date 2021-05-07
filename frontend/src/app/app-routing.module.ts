import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsComponent } from './goods/goods.component';
import { GoodEditComponent } from './good-edit/good-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'goods',
    pathMatch: 'full',
    component: GoodsComponent
  },
  {
    path: 'good-create',
    pathMatch: 'full',
    component: GoodEditComponent
  },
  {
    path: 'good-edit/:id',
    pathMatch: 'full',
    component: GoodEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
