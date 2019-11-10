import { Component, OnInit } from '@angular/core';
import { Student } from './student.model';
import { StudentService } from './student.service';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  students$: Observable<Student[]>;
  error$ = new Subject<boolean>();
  flag = true;

  constructor(private studentservice: StudentService) {}

  ngOnInit() {
    setInterval(() => {
      this.flag = !this.flag;
      this.error$.next(this.flag);
    }, 1000);
    this.students$ = this.studentservice.getErrorOnce().pipe(
      catchError(() => {
        return of([]);
      }),
    );
    // this.students$ = this.studentservice.getStudents();
    // const studentsObservable = this.studentservice.getStudents();
    // studentsObservable.subscribe((studentsData: Student[]) => {
    //     this.students = studentsData;
  }
}
