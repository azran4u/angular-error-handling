import { Component, OnInit } from '@angular/core';
import { Student } from './student.model';
import { StudentService } from './student.service';
import { Observable, Subject, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface CaseStudy {
  name: string;
  data: Observable<Student[]>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  students$: CaseStudy[] = new Array();
  errorLoading$ = new Subject<boolean>();
  error$ = new Subject<boolean>();
  flag = true;
  numbers$: Observable<number>;

  constructor(private studentservice: StudentService) {
    setInterval(() => {
      this.flag = !this.flag;
      this.error$.next(this.flag);
    }, 1000);

    // Option A
    this.students$.push({
      name: 'getStudentsOnce',
      data: this.studentservice.getStudentsOnce(),
    });

    // Option B
    this.students$.push({
      name: 'getStudentsChangedOverTime',
      data: this.studentservice.getStudentsChangedOverTime(),
    });
    // Option C
    this.students$.push({
      name: 'getErrorOnce',
      data: this.studentservice.getErrorOnce(),
    });

    // Option D - log ang reassign value
    this.students$.push({
      name: 'reassign value',
      data: this.studentservice.getErrorOnce().pipe(
        tap(() => {
          console.log('reassign value when error');
        }),
        catchError((err) => {
          console.error('caught mapping error and reassign', err);
          return of([]);
        }),
      ),
    });

    // Option E - log and rethrow error
    this.students$.push({
      name: 'rethrow error',
      data: this.studentservice.getErrorOnce().pipe(
        tap(() => {
          console.log('getErrorOnce');
        }),
        catchError((err) => {
          console.error('caught mapping error and rethrowing', err);
          this.errorLoading$.next(true);
          return throwError(err);
        }),
      ),
    });

    // Option F - distinguish Loading, Success, Error
    this.students$.push({
      name: 'distinguish Loading, Success, Error',
      data: this.studentservice.getErrorOnce().pipe(
        tap({
          next: (val) => {
            // on next 11, etc.
            console.log('on next', val);
          },
          error: (error) => {
            console.log('on error', error.message);
          },
          complete: () => console.log('on complete'),
        }),
        catchError((err) => {
          console.error('caught error', err);
          this.errorLoading$.next(true);
          return of(null);
        }),
      ),
    });

    // Option G
    this.students$.push({
      name: 'getStudents',
      data: this.studentservice.getStudents().pipe(
        tap({
          next: (val) => {
            // on next 11, etc.
            console.log('on next', val);
          },
          error: (error) => {
            console.log('on error', error.message);
          },
          complete: () => console.log('on complete'),
        }),
      ),
    });

    this.numbers$ = this.studentservice.getNumbers();
  }
}
