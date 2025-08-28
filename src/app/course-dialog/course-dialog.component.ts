import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import moment from 'moment';
import { catchError, filter, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CousesService } from '../services/courses.service';


@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    standalone: false
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course: Course;

    @Output()
    private courseChanged = new EventEmitter();

    constructor(
        private courseServices: CousesService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course: Course
    ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required]
        });

        dialogRef.afterClosed()
            .pipe(
                filter(val => !!val),
                tap((val) => {
                    console.log("course changed - courseChanged event will trigged val:", val);
                    this.courseChanged.emit()
                }
                )
            )
            .subscribe();

    }

    ngAfterViewInit() {

    }

    save() {

        const changes = this.form.value;
        this.courseServices.saveCouurse(this.course.id, changes).subscribe(
            (val) => {
                console.log(val);
                return this.dialogRef.close(val);
            },
            err => console.log(err)
        )

    }

    close() {
        this.dialogRef.close();
    }

}
