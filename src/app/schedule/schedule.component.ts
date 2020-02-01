import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {QuizService} from "../../services/quiz.service";
import {parseHttpResponse} from "selenium-webdriver/http";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  showSpinner: boolean = false;
  chapterData = [];
  quizePopup = "none";
  selectedEntName;
  selectedchapterName;
  quizeData: any =[];
  chapterName:any =[];
  Entdatas: any =[];
  editLessonData: any =[];
  editQuizeData: any =[];
  entid;
  chapterid;
  onDownClick = false;
  currentent: any;
  currentChapter: any;
  date = new Date();

  @ViewChild('scheduled_date') chapterScheduleDate;
  constructor(private httpClient: HttpClient,
              private lessonScheduleService: QuizService) { }

  ngOnInit() {
    this.showSpinner = true;
    this.httpClient.get<any>('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      })
      .subscribe(response => {
        this.Entdatas = response.data;
        this.showSpinner = false;
        }, (error: any) => {
        console.log("error = " + error);

      })

    this.httpClient.get<any>('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      })
      .subscribe(response => {
          this.chapterName = response.data;
          console.log('chapterName', this.chapterName);
          this.showSpinner = false;
        },
        (error: any) => {
          console.log("error of put" + error);
        })
  }

  onEntChange(event) {
    this.entid = event;
    this.Entdatas.filter((x) => {
      if(x.entid === event) {
        this.currentent = x;
      }})
    console.log('entid', this.entid);
  }

  onChapterChange(event) {
    this.chapterid = event;
    this.chapterName.filter((x) => {
      if(x.chapter_code === event) {
        this.currentChapter = x;
      }
    });
    console.log('chapterid', this.chapterid);
    this.showSpinner = true;
    this.getQuizedata()
  }

  close(){
    this.quizePopup = 'none';
  }

  createQuizeSchedule() {
    this.quizePopup = 'block';
    this.editQuizeData = this.editLessonData;
    this.editQuizeData.chapters_name = this.currentChapter.chapters_name;
    this.editQuizeData.entname = this.currentent.entname;

  }

  submitQuizeSchedule(data,qDate,duration) {
    console.log('data', data);
    this.quizePopup = 'none';
    let quizeScheduleData =  {
      "entid": this.currentent.entid,
      "lessons_included": [
        this.chapterid
    ],
      "scheduled_date": qDate,
      "chapter_name": this.editQuizeData.chapters_name,
      "duration" : duration
    };
    this.lessonScheduleService.addQuizData(quizeScheduleData)
      .subscribe((response) => {
        console.log(response);
        this.getQuizedata();
        qDate ='';
        alert('Quize Schedule Successfully.');
      })
  }

  getQuizedata() {
    this.lessonScheduleService.getQuizData(this.entid,this.chapterid)
      .subscribe(response => {
        console.log('quizRecord', response);
        if (response.body.data.length > 0) {

          this.quizeData = response.body.data;
        } else {
          this.quizeData = [];
          alert('No Any Quize Schedule Created');
        }
        this.showSpinner = false;
      });
  }
}
