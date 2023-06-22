import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentModel } from './student.model';
import { StudentsService } from '../shared/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  studentform!: FormGroup;
  studentMOdelObj: StudentModel = new StudentModel();
  StudentData!: StudentModel[];
  showadd!: Boolean;
  showupdate!: Boolean;

  constructor(private formbuilder: FormBuilder, private students: StudentsService) { }

  ngOnInit(): void {
    this.studentform = this.formbuilder.group({
      name: ['',[Validators.required,Validators.pattern('[a-zA-Z]+$')]],
      usn: ['',[Validators.required]],
      semester: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]]
    });
    this.getstudentDetails();
  }

  poststudentDetails() {
    console.log(this.studentform.value);
    this.studentMOdelObj.name = this.studentform.value.name;
    this.studentMOdelObj.usn = this.studentform.value.usn;
    this.studentMOdelObj.semester = this.studentform.value.semester;
    this.studentMOdelObj.email = this.studentform.value.email;

    this.students.poststudent(this.studentMOdelObj)
      .subscribe(res => {
        console.log(res);
        alert('Student Added Succesfully')
        this.studentform.reset();
        this.getstudentDetails();
      })
  }

  onclickpoststudentDetails() {
    this.studentform.reset();
    this.showadd = true;
    this.showupdate = false;

  }
  getstudentDetails() {
    this.students.getstudent().subscribe(res => {
      this.StudentData = res;
    })
  }

  deletestudentDetails(row: any) {
    this.students.deletestudent(row.id)
      .subscribe(res => {
        alert(" Student Delete");
        this.getstudentDetails();
      })
  }

  onEdit(row: any) {
    this.studentMOdelObj.id = row.id;
    this.studentform.controls['name'].setValue(row.name);
    this.studentform.controls['usn'].setValue(row.usn);
    this.studentform.controls['semester'].setValue(row.semester);
    this.studentform.controls['email'].setValue(row.email);
    this.showadd = false;
    this.showupdate = true;
  }

  updatestudentDetails() {
    this.studentMOdelObj.name = this.studentform.value.name;
    this.studentMOdelObj.usn = this.studentform.value.usn;
    this.studentMOdelObj.semester = this.studentform.value.semester;
    this.studentMOdelObj.email = this.studentform.value.email;

    this.students.updatestudent(this.studentMOdelObj, this.studentMOdelObj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel')
        ref?.click();
        alert('Book updated Succesfully')
        this.studentform.reset();
        this.getstudentDetails();



      })

  }

  searchStudents(event: any) {
    console.log(event.target.value);

    if (event.target.value) {
      this.students.searchstudents(event.target.value).subscribe(res => {
        this.StudentData = res;
      })
    } else {
      this.getstudentDetails();
    }

  }
  get name(){
    return this.studentform.get('name')
  }
  get usn(){
    return this.studentform.get('usn')
  }
  get semester(){
    return this.studentform.get('semester')
  }
  get email(){
    return this.studentform.get('email')
  }
}





