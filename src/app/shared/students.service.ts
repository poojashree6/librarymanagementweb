import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StudentModel } from '../students/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  baseurl: string = "http://localhost:3000/students"

  poststudent(data: any) {
    return this.http.post<StudentModel>("http://localhost:3000/students", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getstudent() {
    return this.http.get<StudentModel[]>(this.baseurl)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updatestudent(data: any, id: number) {
    return this.http.put<StudentModel>(this.baseurl + '/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deletestudent(id: number) {
    return this.http.delete<StudentModel>(this.baseurl + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  searchstudents(name: string) {
    return this.http.get<StudentModel[]>(`${this.baseurl}?name=${name}`);
  }

}
