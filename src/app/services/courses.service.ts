import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CousesService {
  constructor(private http: HttpClient) { }

  loadAllCourses(): Observable<Course[]> {
    const test = this.http.get<Course[]>('/api/courses');
    return this.http.get<Course[]>('/api/courses').pipe(
      map(res => res["payload"]),

      shareReplay()

    );
  }

  saveCouurse(courseId: string, changes: Partial<Course>): Observable<any> {
    return this.http.put<Course>(`/api/courses/${courseId}`, changes)
      .pipe(
        shareReplay());
  }

}