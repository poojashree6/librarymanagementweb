import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { StudentsComponent } from './students/students.component';
import { BooksComponent } from './books/books.component';
import { SearchBookComponent } from './search-book/search-book.component';

const routes: Routes = [
  {path:'Home' ,component:HomeComponent},
  {path:'Register' ,component:RegisterComponent},
  {path:'Books' ,component:BooksComponent},
  {path:'Students' ,component:StudentsComponent},
  {path:'SearchBook' ,component:SearchBookComponent},
  {path:'',redirectTo:'Home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
