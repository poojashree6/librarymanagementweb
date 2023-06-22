import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BookModel } from '../books/books.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseurl: string = "http://localhost:3000/Books"

  postBook(data: any) {
    return this.http.post<BookModel>("http://localhost:3000/Books", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getBook() {
    return this.http.get<BookModel[]>(this.baseurl)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateBook(data: any, id: number) {
    return this.http.put<BookModel>(this.baseurl + '/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteBook(id: number) {
    return this.http.delete<BookModel>(this.baseurl + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  searchBooks(name: string) {
    return this.http.get<BookModel[]>(`${this.baseurl}?name=${name}`);
  }
}