import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {QuizService} from "../../services/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  showSpinner:boolean = false;
  lessonData:any;
  rowSelected;
  chapterData:any;
  showLesson = false;
  currentChapIndx: any;
  chapter: any;
  display = "none";
  chaptersNameForQuestion:any;


  constructor(private httpClient: HttpClient,
              private lessonScheduleService: QuizService,
              private router: Router) { }

  ngOnInit() {
    this.showSpinner = true;
    this.httpClient.get<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/chapters')
    .subscribe(response => {
      console.log('data',response);
      this.chapterData = response.body
      console.log("this.chapterData" , this.chapterData);
      this.showSpinner = false;
    });

  }

  currentChapter(chaptersName: any, currChepId: any, indx) {
    this.chapter = currChepId,
      this.currentChapIndx = indx,
      this.chaptersNameForQuestion = chaptersName;
  }
  closeChapterPopup(){
    this.display = "none";
  }

  lessonList(chapter) {
    if (chapter) {
      this.display = "none";
      let entid = localStorage.getItem('enterpriseId');
      this.router.navigate(['lessonlist', chapter, entid]);
    } else {
      this.display = "block";
      //alert("Please First select any chapter");
    }
  }

}
