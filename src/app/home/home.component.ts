import { Component, Input, OnInit } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, filter, finalize, map, retryWhen, share, shareReplay, tap } from 'rxjs/operators';
import { CourseCardListComponent } from '../course-card-list/course-card-list.component';
import { CousesService } from '../services/courses.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,

})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private coursesService: CousesService) {

  }

  ngOnInit() {

    this.reloadCourse();



  }

  reloadCourse() {
    console.log("reload course triggered");
    const courses$ = this.coursesService.loadAllCourses()
      .pipe(
        map(courses =>
          courses.sort(sortCoursesBySeqNo)

        )
      );

    this.beginnerCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == "BEGINNER"))

    );

    this.advancedCourses$ = courses$.pipe(
      map(courses => courses.filter(course => course.category == "ADVANCED"))
    );
  }



}




