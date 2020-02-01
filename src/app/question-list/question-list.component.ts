import {Component, Injectable, OnInit, Pipe, PipeTransform} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {QuestionService} from "../../services/question.service";
declare var _: any;

@Pipe({
  name: 'uniqFilter',
  pure: false
})
@Injectable()
export class UniquePipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
    return _.uniqBy(items, args);
  }
}


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questionData:any = [];
  errorMessage:any;
  qData: any=[];
  lessonId: any;
  sub: any;
  showSpinner:boolean = false;
  chapname:any
  DeleteQuestionID:any;
  selectedLevel;
  showQue = false;
  selectedQuestion: any = [];
  question_options: any =[];
  answerData;
  answerIndex = [];
  answers = [];
  chapter_code;
  question_code;
  editData: any =[];
  submittedAnswer: any;
  finalAnswer: any;
  incrementIndex: any;
  items: any= [];
  selectedType;
  display='none';
  editDisplay='none';
  constructor(private httpClient: HttpClient,private route: ActivatedRoute,
              private questionService: QuestionService) {

  }

  ngOnInit() {
    this.showSpinner = true;
    this.sub = this.route.params.subscribe(params => {
      this.lessonId = params['lessonId'];
      this.chapname = params['chapname'];
    });
    this.getQuestion();
  }

  onLevelChange(value) {
    this.questionData = [];
    this.selectedLevel = parseInt(value);
    this.qData.filter((x)=> {
      if(x.question_level === this.selectedLevel) {
        this.questionData.push(x);
        this.showQue = true;
      }
    })
  }

  deleteQuestion(QuestionId:any){
    this.DeleteQuestionID = QuestionId;
  }

  editQuestion(data) {
    console.log('questionId', data);
    this.selectedQuestion = data;
    this.questionService.editQuestionConfirm(this.selectedQuestion.question_code)
      .subscribe(response => {
        if (response.body.Answers === true && response.body.data.length > 0) {
          this.display = 'block';
        } else {
          this.confirmEdit();
        }
      });
  }
  onCloseHandled() {
    this.display='none';
    this.editDisplay = 'none';
  }

  confirmEdit() {
    this.display = 'none';
    this.editDisplay = 'block';
    this.chapter_code = this.selectedQuestion.chapter_code;
    this.question_code = this.selectedQuestion.question_code;
    var obj = this.selectedQuestion.question_options;
    this.question_options = Object.keys(obj).map(function(key) {
      return obj[key].name;
    });
    this.httpClient.get<any>('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.chapter_code + '/questions/' + this.question_code + '/answers',
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      }).subscribe(response => {
      this.answerData = response.data[0].answer;
    });
  }

  remove(i: number, index) {
     this.question_options.splice(index, 1);
  }

  QuestionRemoveData(){
    this.showSpinner = true;
    this.questionService.deleteQuestion(this.DeleteQuestionID)
      .subscribe(response => {
        this.showSpinner = false;
        alert(response.body.message);
        this.showQue = false;
        this.getQuestion();
      }, error1 => {
        alert(error1);
      })
  }

  getQuestion() {
    this.httpClient.get<any>('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/'+this.lessonId+'/questions',{
      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    }).subscribe(
      result => {
        console.log('result', result);
        if (result.data.length >= 1) {
          this.qData = result.data;
        } else {
          alert('No any question added');
        }
        this.showSpinner = false;
      }),
      error => this.errorMessage = error;
    this.showSpinner = false;
  }

  selectchangeforType (value) {
    if(this.selectedType === null) {
      this.selectedType = this.selectedQuestion.question_type
    } else {
      this.selectedType = value;
    }
  }



  questionEditData(value, queOption) {
    let optionObj =[];
    queOption.forEach(opt => {
      let obj ={
        name: opt
      }
      optionObj.push(obj);
    });
    if (value) {
      this.editDisplay = 'none';
      if(this.selectedType === '' || this.selectedType === undefined) {
        this.selectedType = this.selectedQuestion.question_type;
      }
      this.editData = {
        "chapter_code": value.chapter_code,
        "inspired_by": value.inspired_by,
        "question": value.question,
        "question_code": value.question_code,
        "question_date": this.selectedQuestion.question_date,
        "question_insights": value.question_insights,
        "question_level": value.question_level,
        "question_options": optionObj,
        "question_type": this.selectedType
      }
      console.log('editData', this.editData);
    }
    this.questionService.editQuestion(this.editData)
      .subscribe(response => {
        this.addAnswers();
        this.getQuestion();
        this.showQue = false;
        alert('Question update successfully.');
      })
  }

  getAnswer(answer: any, answerIndex: any) {
    if(answer === '') {
      answer = this.answerData;
    }
    this.submittedAnswer = answer;
    this.finalAnswer = +answerIndex;
    this.incrementIndex = this.finalAnswer;
    this.items.push(answer);
    this.answerIndex.push(this.incrementIndex);
    this.answers[this.incrementIndex]  = answer
  }

  addAnswers() {
    this.showSpinner = true;
    this.answers[this.incrementIndex]  = this.submittedAnswer;
    if(this.answers.length === 0 ) {
      this.answers = this.answerData;
    }
    this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.chapter_code + '/questions/' + this.question_code + '/answers',
      JSON.stringify({
        "answer": this.answers
      }),
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
        )
      }
    ).subscribe((data: any) => {
      this.showSpinner = false;
    }, (error: any) => {
      console.log("error of answer =" + error);
      this.showSpinner = false;
    })
  }

}
