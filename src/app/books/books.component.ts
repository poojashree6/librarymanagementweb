import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../shared/api.service';
import { BookModel } from './books.model';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  formValue: FormGroup;
  bookMOdelObj: BookModel = new BookModel();
  BookData!: BookModel[];

  showadd!: Boolean;
  showupdate!: Boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {
    this.formValue = formbuilder.group({})
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
    name: ['',[Validators.required,Validators.pattern('[a-zA-Z]+$')]],
      author: ['',[Validators.required,Validators.pattern('[a-zA-Z]+$')]],
      edition: ['',[Validators.required]]
    });
    this.getBookDetails();
  }

  postBookDetails() {
    console.log(this.formValue.value);
    this.bookMOdelObj.name = this.formValue.value.name;
    this.bookMOdelObj.author = this.formValue.value.author;
    this.bookMOdelObj.edition = this.formValue.value.edition;

    this.api.postBook(this.bookMOdelObj)
      .subscribe(res => {
        console.log(res);
        alert('Book Added Succesfully')
        this.formValue.reset();
        this.getBookDetails();
      })

  }
  OnclickpostBookDetails() {
    this.formValue.reset();
    this.showadd = true;
    this.showupdate = false;

  }

  getBookDetails() {
    this.api.getBook().subscribe(res => {
      this.BookData = res;
    })
  }
  deleteBookDetails(row: any) {
    this.api.deleteBook(row.id)
      .subscribe(res => {
        alert(" Book Delete");
        this.getBookDetails();
      })
  }

  onEdit(row: any) {
    this.bookMOdelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['author'].setValue(row.author);
    this.formValue.controls['edition'].setValue(row.edition);
    this.showadd = false;
    this.showupdate = true;

  }

  updateBookDetails() {
    this.bookMOdelObj.name = this.formValue.value.name;
    this.bookMOdelObj.author = this.formValue.value.author;
    this.bookMOdelObj.edition = this.formValue.value.edition;

    this.api.updateBook(this.bookMOdelObj, this.bookMOdelObj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel')
        ref?.click();
        alert('Book updated Succesfully')
        this.formValue.reset();
        this.getBookDetails();
      })
  }

  searchBook(event: any) {
    console.log(event.target.value);

    if (event.target.value) {
      this.api.searchBooks(event.target.value).subscribe(res => {
        this.BookData = res;
      })
    } else {
      this.getBookDetails();
    }

  }
  get name(){
    return this.formValue.get('name')
  }
  get author(){
    return this.formValue.get('author')
  }
  get edition(){
    return this.formValue.get('edition')
  }
}

