import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students: Student[] = [
    {
      id: 1,
      name: 'Krunal',
      enrollmentNumber: 110470116021,
      college: 'VVP Engineering College',
      university: 'GTU',
    },
    {
      id: 2,
      name: 'Rushabh',
      enrollmentNumber: 110470116023,
      college: 'VVP Engineering College',
      university: 'GTU',
    },
    {
      id: 3,
      name: 'Ankit',
      enrollmentNumber: 110470116022,
      college: 'VVP Engineering College',
      university: 'GTU',
    },
  ];

  constructor(private http: HttpClient) {}

  public getStudentsOnce(): Observable<Student[]> {
    return new Observable<Student[]>((observer) => {
      console.log('refreshing');
      observer.next(this.students);
    });
  }

  public getStudentsChangedOverTime(): Observable<Student[]> {
    return new Observable<Student[]>((observer) => {
      console.log('refreshing');
      setInterval(() => {
        observer.next(this.students);
      }, 1000);
    });
  }

  public getErrorOnce(): Observable<Student[]> {
    return this.http.get<Student[]>('/api/students');
  }
}
