import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ProductComponent } from './product/product.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'orders/total', component: NewOrderComponent },
  { path: 'orders/export', component: NewOrderComponent },
  { path: 'orders/import', component: NewOrderComponent },
  { path: 'orders/import/register', component: AddNewOrderComponent },
  { path: 'orders/export/register', component: AddNewOrderComponent },
  { path: 'orderstatus/import/:type', component: OrderstatusComponent },
  { path: 'orderstatus/export/:type', component: OrderstatusComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
