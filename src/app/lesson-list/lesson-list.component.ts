import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "../../../node_modules/@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {

  chapterId: any;
  entid: any;
  private sub: any;
  showSpinner:boolean = false;
  chapname:any;
  lessonData: any = [];
  constructor(private httpClient: HttpClient,private route: ActivatedRoute,
              private lessonScheduleService: QuizService) { }
  ngOnInit() {
    this.showSpinner = true;
    this.sub = this.route.params.subscribe(params => {
      this.chapterId = params['chapterId'];
      this.entid = params['entid'];
    });
    this.httpClient.get<any>('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.chapterId, {

      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    }).subscribe(
      result => {
        // this.editChapterData = result;

      //   this.lessonScheduleService.getLessonSchedule(this.entid,this.chapterId)
      // .subscribe((response) => {
        if(result) {
          console.log('response', result);
          this.lessonData = result.data;
          this.showSpinner = false;
        } else {
          alert('No any lesson is created for this chapter.');
        }
      });
    }
}
