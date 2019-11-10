import { Component, OnInit } from '@angular/core';
import { Student } from './student.model';
import { StudentService } from './student.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  students$: Observable<Student[]>;
  errorLoading$ = new Subject<boolean>();
  error$ = new Subject<boolean>();
  flag = true;

  constructor(private studentservice: StudentService) {}

  ngOnInit() {
    setInterval(() => {
      this.flag = !this.flag;
      this.error$.next(this.flag);
    }, 1000);

    // Option A
    // this.students$ = this.studentservice.getStudentsOnce();

    // Option B
    // this.students$ = this.studentservice.getStudentsChangedOverTime();

    // Option C
    // this.students$ = this.studentservice.getErrorOnce();

    // Option D - log ang reassign value

    // Option E - log and rethrow error
    this.students$ = this.studentservice.getErrorOnce().pipe(
      tap(() => {
        console.log('getErrorOnce');
      }),
      catchError((err) => {
        console.error('caught mapping error and rethrowing', err);
        this.errorLoading$.next(true);
        return throwError(err);
      }),
    );

    // this.students$ = this.studentservice.getStudents();
    // const studentsObservable = this.studentservice.getStudents();
    // studentsObservable.subscribe((studentsData: Student[]) => {
    //     this.students = studentsData;
  }
}
