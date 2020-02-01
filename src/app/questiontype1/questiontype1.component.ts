import { Component, OnInit } from '@angular/core';
import { Customer } from './customer.interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
@Component({
  selector: 'app-questiontype1',
  templateUrl: './questiontype1.component.html',
  styleUrls: ['./questiontype1.component.css']
})
export class Questiontype1Component implements OnInit {
  public myForm: FormGroup;
  public id: any;
  submittedAnswer: any
  private sub: any;
  finalAnswer: any;
  incrementIndex: any;
  showSpinner: boolean = false;
  questionId: any;
  selectTypes: any;
  currentType = 1
  redClassBool:boolean = true;
  redClassBool1:boolean = true;
  redClassBool2:boolean = true;
  validationOfQuestion:any;
  validationOfInspired:any;
  validationOfQuestionLevel:any;
  validationOfAnswerExplaination:any;
  answer;
  queValue;
  constructor(private _fb: FormBuilder, private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {

    this.myForm = new FormGroup({
      // email: new Control(self.email),
      // password: new Control("")
    });
  }

  addAnswers() {
    this.currentType = 1;
    let ansID = this.incrementIndex;
    let ansObj = {};
    ansObj[ansID] = this.submittedAnswer;


    this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.id + '/questions/' + this.questionId + '/answers',
      JSON.stringify({
        "answer":
          ansObj

      }),
      {
        headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
        )
      }
    ).subscribe((data: any) => {

      // console.log(data);
      this.showSpinner = false;

    }, (error: any) => {

      console.log("error of answer =" + error);
      this.showSpinner = false;
    })
  }

  ngOnInit() {

    // const data = document.getElementById("typesSelect").firstChild;
    // console.log("type 1 is calling = "+data);
    this.currentType = 1;
    // we will initialize our form here
    this.myForm = this._fb.group({
      question: [''],
      inspired_by: [''],
      question_insights: [''],
     // question_type: [''],
      question_level: [''],
      //   question_options: this._fb.group([
      //     this.initAddress(),
      // ])
      question_options_array: this._fb.array([
        this.initAddress(),
      ]),
      question_options: this._fb.group([
        this.initAddress(),
      ])
    });
  }
  get self() {
    return this;
  }
  getAnswer(answer: any, answerIndex: any) {

    this.submittedAnswer = answer;
    this.finalAnswer = +answerIndex
    this.incrementIndex = this.finalAnswer;
  }
  initAddress() {
    // initialize our address
    return this._fb.group({
      name: ['']

    });
  }
  addAddress() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['question_options_array'];
    control.push(this.initAddress());
  }
  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['question_options_array'];
    control.removeAt(i);
  }
  saveQuestion(formData: any) {

    if(this.validationOfQuestion == "" || this.validationOfAnswerExplaination == undefined){

            this.redClassBool = false;
            this.redClassBool1 = true;
            this.redClassBool2 = true;
            return false;
          }
          if(this.validationOfAnswerExplaination == "" || this.validationOfAnswerExplaination == undefined){

                  this.redClassBool = false;
                  this.redClassBool1 = true;
                  this.redClassBool2 = true;
                  return false;


          }
          if(this.validationOfQuestionLevel == "" || this.validationOfQuestionLevel == undefined){

            this.redClassBool = false;
            this.redClassBool1 = true;
            this.redClassBool2 = true;
            return false;


            }
            if(this.validationOfInspired == "" || this.validationOfInspired == undefined){

              this.redClassBool = false;
              this.redClassBool1 = true;
              this.redClassBool2 = true;
              return false;


           }

    if(formData.question_options_array.length > 1)
    {
      if(this.submittedAnswer == "" || this.submittedAnswer == undefined){

              //this.redClassBool2 = false;

              this.redClassBool2 = false;
              this.redClassBool1 = true;
              this.redClassBool = false;
              return false;
            }
      this.redClassBool1 = true;

      //alert("Answer = "+this.submittedAnswer);

      for (let i = 0; i < formData.question_options_array.length; i++) {

        formData.question_options[i] = formData.question_options_array[i]
      }

      this.sub = this.route.params.subscribe(params => {
        this.id = params['lId'];

      });
      this.showSpinner = true;
      console.log("formData",formData);
      console.log("currentType ",this.currentType);
      formData.question_type = this.currentType;
      console.log("formData.question_type1 ",formData);
      this.httpClient.post('https://36mxqyy77a.execute-api.us-east-1.amazonaws.com/dev/chapters/' + this.id + '/questions',
        formData,
        {
          headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )
        }
      ).subscribe((data: any) => {

        console.log(data);
        this.questionId = data.question_code;
        this.redClassBool2 = true;
        this.redClassBool = true;
        this.ngOnInit();
        this.addAnswers();

      }, (error: any) => {

        if(error.status = "400")
        {

            console.log("Please enter options values");
            this.redClassBool = false;

        }
        this.showSpinner = false;

      })
    }
    else{

      this.redClassBool1 = false;
      this.redClassBool2 = true;
      this.redClassBool = true;
      this.showSpinner = false;

    }

  }
  selectchangeforType(args) {

    this.selectTypes = args;
    console.log('ssssssssssssssssss', this.selectTypes);
    this.sub = this.route.params.subscribe(params => {
      this.id = params['lId'];

    });
    if (this.selectTypes == "1") {

      // this.router.navigate(['lessons/chapter/type1', chepId]);
      this.router.navigate(['type1', this.id]);
    } else if (this.selectTypes == "2") {

      this.router.navigate(['type2', this.id]);

    } else {

      this.router.navigate(['type3', this.id]);

    }

  }

  onQuestionView() {
    document.getElementById("questionViewPopup").classList.add("in");
    this.answer  = <FormArray>this.myForm.controls['question_options_array'];
    this.queValue = this.answer.value;
  }
  closeDialog() {
    document.getElementById("questionViewPopup").classList.remove("in");
  }
}
