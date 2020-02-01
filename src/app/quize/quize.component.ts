import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {count} from 'rxjs/operators/count';
import {ObjNgFor} from '../client-enterprise/myPipe';
//import {MdCheckbox} from '@angular2-material/checkbox';
import {Router} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {ajaxGetJSON} from "rxjs/observable/dom/AjaxObservable";
import {yellow} from "@angular-devkit/core/src/terminal/colors";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {QuizService} from "../../services/quiz.service";
import {QuestionService} from "../../services/question.service";
import {NotificationService} from "../../services/notification.service";


@Component({
  selector: 'app-quize',
  templateUrl: './quize.component.html',
  styleUrls: ['./quize.component.css']
})
export class QuizeComponent implements OnInit {
  public myForm: FormGroup;
  quizeData: any;
  showSpinner: boolean = false;
  entId: any;
  msg;
  any
  userID: any
  quizStatus = "Not Started"
  quizeQuestion: any;
  count = 0;
  myQuizquestion: any
  Qlength: any;
  answerData = [];
  option: any
  compareData: any;
  currentAns: any;
  myIndex: any;
  display = 'none';
  message: any;
  currectAnswer: any;
  currectAnswerdata: any
  currentType: any
  isValid: boolean = true;
  type2Data = [];
  myValue: any;
  currentChapterCode: any
  selection;
  QuizScheduleId: any
  userLevel: any
  quizeIdData: any;
  isAvailable = true;
  redClassBool = true;
  finalType2Answers = []
  finalType2Index = []
  questionSection: boolean = true;
  disableQuestion: boolean = false;
  isFound: boolean = true;
  public data;
  ratingModelShow: boolean = false;
  ratingClicked: any;
  rating: number;
  id: number;
  submit: boolean;
  comments: any;
  type2Answer;
  p: number = 1;
  lesson_Name;
  hideIcon = false;
  quizeDate;
  chapterCode;
  attemptQue = 0;
  question = [];
  questionDisable = false;
  queDetail = [];
  selectedAns = [];
  ansChecked = [];
  lessonSection = false;
  chapter_no;
  lesson_data: any = [];
  scheduledLesson: any = [];
  availQuiz = false;
  quizScheduleId;
  finalquizestatus;
  // showLevel = false;
  duration;
  lessonDiv = true;
  questionDiv = true;
  listDiv = true;
  userLevelDiv = false;
  explanation;
  quizeListData: any = [];
  currentStatus;
  constructor(private httpClient: HttpClient, private _fb: FormBuilder,
              private quizService: QuizService,
              private questionService: QuestionService,
              private notificationService: NotificationService) {
  }

  backEvent() {
    this.listDiv = true;
    this.lessonDiv = true;
    this.questionSection = true;
    this.lessonSection = false;
    this.userLevelDiv = false;
    this.myQuizquestion = '';
    this.answerData = [];
  }

  // Quize start
  quizStart() {
    console.log("quizScheduleId = " + this.QuizScheduleId);
    this.myIndex = !this.myIndex;
    this.availQuiz = true;
    this.lessonSection = true;
    this.questionSection = false;
    this.showSpinner = true;
    this.userID = localStorage.getItem("userId");
    this.httpClient.put('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/quizzes/' + this.entId + '/users/' + localStorage.getItem("Updated_user_id") + '/' + this.QuizScheduleId + "_" + localStorage.getItem("Updated_user_id"),
      JSON.stringify({

        quiz_schedule_id: this.QuizScheduleId,
        scheduled_status: "Running"

      }),
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
        )
      }
    ).subscribe((data: any) => {
      this.showSpinner = true;
      this.questionService.getQuestion(this.userID, this.chapter_no,this.entId)
        .subscribe(response => {
          console.log('response',response);
          if(response.statusCode === 200) {
            this.currentStatus = "Running";
            if (response.body.data.length <= 0) {
              alert('Quize not started yet');
            }
            this.quizeQuestion = response.body;
            console.log("i am calling-------------------->",this.quizeQuestion);
            this.finalquizestatus = this.quizeQuestion.finalquizestatus;
            this.userLevel = this.quizeQuestion.week_number;
            console.log("finalquizestatus",this.finalquizestatus);
            if (this.finalquizestatus === 1) {
              alert('You are completed this week quiz');
              this.lessonDiv = false;
              this.questionDiv = true;
              this.showSpinner = false;
              this.lessonSection = false;
            } else {
              this.lessonDiv = true;
              this.questionDiv = false;
              this.option = 0;
              this.currentType = this.quizeQuestion.data[0].question_type ? this.quizeQuestion.data[0].question_type : '';
              this.currentChapterCode = this.quizeQuestion.data[0].chapter_code;
              /*start show lessons*/

              if (this.currentType == "1") {

                this.isValid = true;
              } else {
                this.isValid = false;
              }

              for (data in this.quizeQuestion.data[0].question_options) {
                this.option = this.option + 1;
                this.answerData[this.option - 1] = this.quizeQuestion.data[0].question_options[this.option - 1].name
              }

              /*this is give the answer*/

              this.Qlength = this.quizeQuestion.data.length;
              this.myQuizquestion = this.quizeQuestion.data[0].question;
              this.explanation = this.quizeQuestion.data[0].question_insights;
              this.showSpinner = false;
            }
            this.showSpinner = false;
          } else {
            this.showSpinner = false;
            alert(response.body.message);
            this.listDiv = true;
            this.questionDiv = true;
          }
        });
      // this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/schedules/questions/' + this.entId + '/' + quizScheduleId + '',
      //   {
      //     headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      //   }).subscribe(data => {
        // this.quizeQuestion = data
        // console.log("i am calling-------------------->",data);
        // /*that is giving number of answer*/
        // this.option = 0
        // this.currentType = this.quizeQuestion.data[0].question_type;
        // this.currentChapterCode = this.quizeQuestion.data[0].chapter_code;
        // /*start show lessons*/
        // this.showSpinner = true;
        this.entId = localStorage.getItem("enterpriseId");

        // this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.currentChapterCode,
        //   {
        //     headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
        //   }).subscribe(data => {
        //
        //   let lessonData;
        //   lessonData = data
        //   console.log(lessonData);
        //   this.finalLessonData = lessonData.data.chapter_lesson;
        //   this.finalLessonDataName = lessonData.data.chapters_name;
        //
        //   this.showSpinner = false;
        //   //this.Edata = Array.of(this.Edata);
        // }, (error: any) => {
        //
        //   console.log("error = " + error);
        //
        // })
        // /*end show lessons*/

        // if (this.currentType == "1") {
        //
        //   this.isValid = true;
        // } else {
        //   this.isValid = false;
        //
        // }
        // for (data in this.quizeQuestion.data[0].question_options) {
        //   this.option = this.option + 1
        //   this.answerData[this.option - 1] = this.quizeQuestion.data[0].question_options[this.option - 1].name
        // }
        //
        // /*this is give the answer*/
        //
        // this.Qlength = this.quizeQuestion.data.length;
        // this.myQuizquestion = this.quizeQuestion.data[0].question;
        //this.quizStatus = "Running"
        // this.showSpinner = false;
      // }, (error: any) => {
      //   console.log("error in inner = " + error.message);
      // })


    }, (error: any) => {
      console.log("error of enterprise = " + error.message);
      this.showSpinner = false;
    })
  }

  //for Question increment
  questionNext() {
    this.p = this.p + 1;
    this.currentAns = '';
    this.entId = localStorage.getItem("enterpriseId");
    this.disableQuestion = false;
    this.display = 'none';
    this.count = this.count + 1;
    this.attemptQue = this.attemptQue + 1;
    if (this.attemptQue === this.Qlength) {
      this.userID = localStorage.getItem("userId");

      //for complete status
      this.showSpinner = true;
      this.httpClient.put('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/quizzes/' + this.entId + '/users/' + localStorage.getItem("Updated_user_id") + '/' + this.QuizScheduleId + "_" + localStorage.getItem("Updated_user_id"),
        JSON.stringify({
          quiz_schedule_id: this.QuizScheduleId,
          scheduled_status: "Completed"
        }),
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {
        console.log(data);
        this.currentStatus = "Completed";
        this.ratingModelShow = true;
        /*questionsengagement*/

        // this.httpClient.post('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/' + this.entId + '/users/' + this.userID + '/quizzes/' + this.QuizScheduleId + '/questionsengagement',
        //   {},
        //   {
        //
        //     headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
        //
        //   }).subscribe(data => {

          // console.log("questionsengagement is calling==>", data)
          // this.ratingModelShow = true;
          this.showSpinner = false;
        // }, (error: any) => {
        //
        //   console.log("error = " + error);
        //
        // })
        /* userlevel */

        this.httpClient.post('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/' + this.entId + '/users/' + this.userID + '/quizzes/' + this.QuizScheduleId + '/userlevel',
          {},
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
            )
          }
        ).subscribe((data: any) => {
          console.log('data', data);
          let userLevel;
          userLevel = data;
          // this.userLevel = userLevel.data.user_level
          console.log("userLevel is calling==>", this.userLevel);
          this.showSpinner = false;
          this.redClassBool = true;


        }, (error: any) => {

          console.log("error of enterprise == " + error.message);
        })


        this.showSpinner = false;

      }, (error: any) => {

        console.log("error of enterprise = " + error);
      });


      this.quizStatus = "Complete";
      let changeStatus = {
        "quiz_schedule_id": this.QuizScheduleId,
        "userid": this.userID
      };
      console.log('changeStatus', changeStatus);
      this.httpClient.post('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/changequizestatus', changeStatus)
        .subscribe((response) => {
          this.hideIcon = true;
        });
      this.questionSection = true;

    } else {

      for(let i=0; i< this.question.length; i++) {
        if(this.question[i] === this.quizeQuestion.data[this.count].question_code) {
          this.questionDisable = true;
        }
      }
      if(this.finalquizestatus === 0) {
        this.lessonDiv = true;
        this.questionDiv = false;
        this.myQuizquestion = this.quizeQuestion.data[this.count].question
        //for options
        this.myIndex = !this.myIndex
        this.answerData = [];
        this.option = 0

        this.currentType = this.quizeQuestion.data[this.count].question_type;

        if (this.currentType == "1") {

          this.isValid = true

        } else {

          this.isValid = false
        }
        for (let data in this.quizeQuestion.data[this.count].question_options) {

          this.option = this.option + 1;
          this.answerData[this.option - 1] = this.quizeQuestion.data[this.count].question_options[this.option - 1].name

        }

      } else {
        this.lessonDiv = false;
        this.questionDiv = true;
      }


    }

  }

  selectedAnswer(answer, index) {
    this.myValue = answer
    this.myIndex = index
    this.currentAns = answer
  }

  selectedAnswertype2(answer: string, isChecked, finalIndex) {
    this.type2Answer = answer;
    console.log("i = " + finalIndex);
    console.log("answer = " + answer);
    this.finalType2Answers.push(answer)
    this.finalType2Index.push(finalIndex)
    /*
      this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/users/' + this.userID + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/useranswers',
        JSON.stringify({
          "answer":
            ansObj
        }),
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {

        this.display = 'block';
        this.showSpinner = false;

      }, (error: any) => {

        console.log("error of enterprise" + error);
      });
    */
    // console.log("answer: ", answer , "isChecked" , isChecked, "this.type2Data", this.type2Data);
    let index;
    if (this.type2Data.length === 0) {
      this.type2Data.push(answer);
      isChecked.target.checked = true;
    }
    else {
      const result = this.type2Data.find(function (element) {

        return element === answer;
      });


      if (result === 'undefined' || typeof result == "undefined") {
        this.type2Data.push(answer);
        isChecked.target.checked = true;
      } else {
        let index = this.type2Data.findIndex(x => x == answer);
        this.type2Data.splice(index, 1);
        isChecked.target.checked = false;
      }
    }
    console.log("this.type2Data: ", this.type2Data);
  }

  findIsChecked(value) {

    if (this.type2Data.length > 0) {
      const result = this.type2Data.find(function (element) {
        return element === value;
      });
      if (result === 'undefined' || typeof result == "undefined")
        return false;
      else
        return true;

    } else {
      return false;
    }
  }

  findIndexToUpdate(answer) {
    return answer === this;
  }

  submitAnswer() {
    let ansObj = {};

    if (this.type2Answer === undefined && this.myValue === undefined) {
      alert('Select Answer')
      this.disableQuestion = false;
    } else {
      this.showSpinner = true;

      //  if (this.currentAns) {

      this.disableQuestion = true;

      if (this.currentType == "1") {
        /*for type1 start*/
        let ansID = this.myIndex;
        ansObj[ansID] = this.currentAns;
        // this.queDetail = [{
        //   'index': ansID,
        //   'answer': this.currentAns,
        //   'que_code': this.quizeQuestion.data[this.count].question_code
        //
        // }];
        // this.selectedAns.push(this.queDetail);
        this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/users/' + this.userID + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/useranswers',
          JSON.stringify({
            "answer":
            ansObj
          }),
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
            )
          }
        ).subscribe((data: any) => {


          /*for right answer*/
          this.httpClient.get('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.quizeQuestion.data[this.count].chapter_code + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/answers',
            {
              headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
            }).subscribe(data => {

            console.log('currectAnswerdata type1:', data);
            this.currectAnswerdata = data;

            this.currectAnswer = [];
            this.currectAnswer = null;
            for (let ans in this.currectAnswerdata.data[0].answer) {
              this.currectAnswer = this.currectAnswerdata.data[0].answer[ans]
            }
            setTimeout(() => {
              if (this.currectAnswer === this.currentAns) {
                this.message = "Correct Answer"
                this.currentAns = [];
                this.display = 'block';
                this.isFound = false;
                this.showSpinner = false;
              } else {
                this.message = "Incorrect Answer"
                this.currentAns = [];
                this.display = 'block';
                this.isFound = true;
                this.showSpinner = false;
              }
            },1000)

          }, (error: any) => {

            console.log("error = " + error);

          })

          this.showSpinner = false;

        }, (error: any) => {

          console.log("error of enterprise" + error);
        });
        /*for type1 end*/
      }
      else {
        /*type 2 solutions*/
        ansObj = {};
        this.httpClient.get('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.quizeQuestion.data[this.count].chapter_code + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/answers',
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
          }).subscribe(data => {
          console.log("type 2 data", data);
          this.compareData = data
          let obj1 = [];
          obj1 = this.compareData.data[0].answer;

          console.log("saved answer = ", obj1);
          this.display = 'block';
          this.showSpinner = false;
          let answer1 = [];
          let obj2 = [];
          obj2 = this.type2Data
          console.log("inputed data", obj2)
          let wrong = 0;
          for (let key in obj1) {

            answer1.push(obj1[key]);

          }
          for (let i = 0; i < obj2.length; i++) {
            if (answer1.indexOf(obj2[i]) != -1) {
              console.log("found");
              this.isFound = false;
              this.currectAnswer = [];
              this.currectAnswer = answer1;
            }
            else {

              console.log("not found");
              this.isFound = true;
              this.currectAnswer = [];
              this.currectAnswer = answer1;
              wrong = wrong + 1

            }

          }
          if (wrong > 0) {

            this.message = "Incorrect Answer"

          } else {

            this.message = "Correct Answer"
          }
          /*for type2 start*/

          console.log("finalType2Answers", this.finalType2Answers, "index", this.finalType2Index);

          console.log("this.finalType2Answers.length", this.finalType2Answers.length);

          for (let i = 0; i < this.finalType2Index.length; i++) {

            for (let j = 0; j < this.finalType2Index.length; j++) {

              console.log(this.finalType2Index[i], this.finalType2Answers[j]);

              ansObj[this.finalType2Index[j]] = this.finalType2Answers[j]

            }

          }
          this.queDetail = [{
            'answer': ansObj,
            'que_code': this.quizeQuestion.data[this.count].question_code
          }];

          this.selectedAns.push(this.queDetail);
          /*type 2 save answer*/
          console.log("final  answerrr  = ", ansObj);
          this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/users/' + this.userID + '/questions/' + this.quizeQuestion.data[this.count].question_code + '/useranswers',
            JSON.stringify({
              "answer":
              ansObj
            }),
            {
              headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
              )
            }
          ).subscribe((data: any) => {

            console.log("data", data);
            this.display = 'block';
            this.type2Data = [];
            this.finalType2Answers = [];
            this.finalType2Index = [];
            this.showSpinner = false;

          }, (error: any) => {

            console.log("error of enterprise" + error.message);
          });

        }, (error: any) => {

          console.log("error = " + error);

        })
        //---
        console.log("answer", ansObj)

//-----
      }
      this.question.push(this.quizeQuestion.data[this.count].question_code);
    }

  }

  /* onChange(email: string, event: boolean) {

    const emailFormArray = <FormArray>this.myForm.controls.Type2options;
    console.log(event);
   if (event) {
      emailFormArray.push(new FormControl(email));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
    }
  }*/
  counter(i: number) {
    return new Array(i);
  }

  showLesson(chapter_code) {
    this.showSpinner = true;
    console.log('chapter_code',chapter_code);
    this.httpClient.get<any>('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/chapters/' + chapter_code,
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      }).subscribe(response => {
      this.lesson_data = response.data;
      this.chapter_no = this.lesson_data.chapter_code;
      this.quizService.getQuiz(this.chapter_no, parseInt(this.entId))
        .subscribe(response => {
          console.log('getquizresponse', response);
          this.QuizScheduleId = response.body.data[0].quiz_schedule_id;
          this.showSpinner = false;
        });
      this.listDiv = false;
      this.lessonDiv = false;
      this.lessonSection = false;
      this.availQuiz = true;
      this.showSpinner = false;
      //this.Edata = Array.of(this.Edata);
    }, (error: any) => {

      console.log("error = " + error);

    });
  }

  ngOnInit() {
    this.showSpinner = true;
    this.entId = localStorage.getItem("enterpriseId");
    this.quizService.getChapterList()
      .subscribe(response => {
        this.quizeData = response.body;
        console.log('quizeData', this.quizeData);
        this.quizeData.data.filter((x) => {
          if(x.quiz_status === 0 && x.entid === parseInt(this.entId)) {
            this.quizeListData.push(x)
            this.chapterCode = x.lessons_included;
            this.duration = x.duration;
            this.QuizScheduleId = x.quiz_schedule_id;
            this.lesson_Name = x.chapter_name;
            this.quizeDate = x.scheduled_date;
          }
        });
        this.showSpinner = false;
      });


    this.showSpinner = false;

    this.userID = localStorage.getItem("Updated_user_id");
    console.log("this.userID", this.userID)
    this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/schedules/userquizquestions/' + this.entId + '/' + localStorage.getItem("Updated_user_id"),
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
      }).subscribe(data => {
      console.log("data=============", data);
      this.quizeIdData = data;
      if (this.quizeIdData.data == "") {
        this.showSpinner = false;
      } else {
        this.showSpinner = false;
        this.quizStart();

      }

    }, (error: any) => {

      console.log("error = " + error);
      this.showSpinner = false;
    })

    this.myForm = this._fb.group({
      Type2options: this._fb.array([])
    });
  }


  // testing(temp1:any) {

  // }
  showMyPop() {
    this.redClassBool = false;
  }

  hideQuizepopUp() {
    this.redClassBool = true;
    // this.showLevel = false;
  }

  ratingComponentClick(clickObj: any): void {
    this.showSpinner = true;
    this.ratingClicked = clickObj;
    this.userID = localStorage.getItem("Updated_user_id");
    this.entId = localStorage.getItem("enterpriseId");
    console.log('this.chapterCode[0]', this.chapterCode[0]);
    console.log('this.quizeData', this.QuizScheduleId);
    let obj = {
      "user_quiz_accessed_id": this.QuizScheduleId,
      "user_lesson_accessed_id": this.chapterCode[0],
      "entid": parseInt(this.entId),
      "userid": this.userID,
      "lesson_rating": this.ratingClicked.rating,
      "comment": this.ratingClicked.comments
    };
    this.httpClient.post('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/rating', obj)
      .subscribe(data => {
        this.showSpinner = false;
        alert('Thank you for rating..');
        this.userLevelDiv = true;
      });
    if (this.ratingClicked.submit === true) {
      this.ratingModelShow = false;
      // this.showLevel = true;
    }

  }

  pageChanged(value) {
    this.p = value;
    this.count = value - 1;
    let check = this.question.includes(this.quizeQuestion.data[this.count].question_code);
    for(let i =0; i<this.selectedAns.length; i++) {
      if(this.selectedAns[i].que_code === this.quizeQuestion.data[this.count].question_code) {
          this.ansChecked = this.selectedAns[i].i;
      }
    }
    if(check === true) {
      this.questionDisable = true;
    } else {
      this.questionDisable = false;
    }
    this.answerData = [];
    this.option = 0;
    for (let data in this.quizeQuestion.data[this.count].question_options) {
      this.option = this.option + 1;
      this.answerData[this.option - 1] = this.quizeQuestion.data[this.count].question_options[this.option - 1].name;
    }

  }
}
