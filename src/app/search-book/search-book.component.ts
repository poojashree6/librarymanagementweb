import { Component,OnInit} from '@angular/core';
import { ApiService } from '../shared/api.service';
import { BookModel } from '../books/books.model';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent  implements OnInit{
  BookData!: BookModel[];
  imagePath:string= "../../assets/";

  constructor( private api: ApiService) {}

  
  ngOnInit(){
    this.getBookDetails();

  }

  getBookDetails() {
    this.api.getBook().subscribe(res => {
      this.BookData = res;
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
}
