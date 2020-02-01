import {isNullOrUndefined} from "util";

declare var updater: any;
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {NgZone} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ForgotPasswordService} from './forgot-password.service';
//import './updater.js';
declare var orgId: any;
declare var myExtObject: any;
declare var require: any;
declare var fs: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: any;
  entid: any;
  email: any;
  redClassBool: boolean = true;
  accessTokenData: any;
  hideVar: boolean;
  public showSpinner: boolean = false;
  detailsData: any;
  errMessage;

  // lib = new electronNotification();

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private httpClient: HttpClient,
    private router: Router,
    private zone: NgZone,
  ) {

  }

///////////////////forgot Password
  forgotPasswordSuccess = false;
/////
  emailForget;
  passcodeForget;
  passwordForget;
  emailFailError = false;
  passwordFail;
  passwordSuccess;
  userRole;
  showPassword = false;

  resetPassword = new FormGroup({

    forgotPassword: new FormGroup({
      email: new FormControl(null, [Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")])
    }),
    verificationCode: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required,
      Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()-_=+{}|?>.<,:;~`’]{8,}$")]),

  })

  onForgetPassword() {
    document.getElementById("forgotPopup").classList.add("in");
    console.log("on Forget password");
    this.passwordFail = true;
    this.passwordSuccess = false;
    this.emailFailError = false;
    this.isResetPasswordError = false;
  }

  onSubmitForget() {
    this.emailFailError = false;
    var postJSON = {
      "username": this.emailForget
    }
    console.log("localStorage.getItem(Orgnisation_id) => ", localStorage.getItem("Orgnisation_id"))
    this.forgotPasswordService.postPasswordForget(localStorage.getItem("Orgnisation_id"), postJSON).subscribe(post => {
      console.log("post", post);

      this.emailFailError = false;
      this.passwordFail = false;
      this.passwordSuccess = true;
    }, error => {
      console.log("ERRORRRR", error);
      this.emailFailError = true;
    })
  }

  isResetPasswordError = false;
  resetPasswordErrorMessage

  onSubmitReset() {
    console.log("localStorage.getItem(Orgnisation_id) => ", localStorage.getItem("Orgnisation_id"))
    var postJSON = {
      "username": this.emailForget,
      "passwordresetcode": this.passcodeForget,
      "newpassword": this.passwordForget
    }
    this.forgotPasswordService.postPasswordReset(localStorage.getItem("Orgnisation_id"), postJSON).subscribe(post => {
      console.log("post", post);
      this.forgotPasswordSuccess = true;
      this.isResetPasswordError = false;
      document.getElementById("forgotPopup").classList.remove("in");
      this.emailForget = "";
      this.passcodeForget = "";
      this.passwordForget = "";

    }, error => {
      this.isResetPasswordError = true;
      this.resetPasswordErrorMessage = error;

    })
    console.log("on subm 2");
  }

  closeDialog() {
    console.log("claod");
    document.getElementById("forgotPopup").classList.remove("in");
  }

////////////////////////end forgot Password


  logInData(): any {
    this.showSpinner = true;
    this.entid = localStorage.getItem("Orgnisation_id");
    console.log("name = " + this.email + " Password value = " + this.password + " entid = " + localStorage.getItem("Orgnisation_id") + " userrole = " + this.userRole);
    if ((this.userRole === false || this.userRole === '') && !isNullOrUndefined(this.email)) {
      let data = {
        username: this.email,
        entid: this.entid
      };
      console.log('userRole in if', this.userRole);
      this.httpClient.post('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/clientlogin', data)
        .subscribe((res: any) => {
          console.log('userloginres', res);
          localStorage.setItem("accessToken", res.data.accessToken);
          setTimeout(() => {
            this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/userdetails',
              {
                headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
              })
              .subscribe(data => {

                this.detailsData = data
                console.log("user details = ", this.detailsData.data.userid);
                localStorage.setItem("loginUser", this.detailsData.data.user_name);
                localStorage.setItem("Updated_user_id", this.detailsData.data.userid);
                localStorage.setItem("enterpriseId", this.detailsData.data.entid);
                console.log(this.detailsData);
                console.log(this.detailsData.data.role_assigned);
                let value = this.detailsData.data.role_assigned

                for (let name in value) {

                  if (name == "Super Admin") {

                    this.router.navigateByUrl('/SuperAdmin');
                    this.showSpinner = false;

                  } else if (name == "Examinee") {

                    this.router.navigateByUrl('/quiz');

                    this.showSpinner = false;

                  } else {

                    this.router.navigateByUrl('/SiteAdminHome');
                    this.showSpinner = false;
                  }
                }
              });
          }, 1000);
        });
    } else if (this.userRole === true && !isNullOrUndefined(this.email) && !isNullOrUndefined(this.password)) {
      this.showSpinner = false;
      this.httpClient.post("https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/users/signin/",
        {
          // email:'sampleapp53@gmail.com',
          // password:"Empower@123",
          // entid: "12333"

          email: this.email,
          password: this.password,
          entid: localStorage.getItem("Orgnisation_id")
          // entid: "12333"
        }).subscribe((data: any) => {
        localStorage.setItem("accessToken", data.accessToken);
        this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/userdetails',
          {
            headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
          })
          .subscribe(data => {

            this.detailsData = data
            console.log("user details = ", this.detailsData.data.userid);
            localStorage.setItem("loginUser", this.detailsData.data.user_name);
            localStorage.setItem("Updated_user_id", this.detailsData.data.userid);
            localStorage.setItem("enterpriseId", this.detailsData.data.entid);
            console.log(this.detailsData);
            console.log(this.detailsData.data.role_assigned);
            let value = this.detailsData.data.role_assigned

            for (let name in value) {

              if (name == "Super Admin") {

                this.router.navigateByUrl('/SuperAdmin');
                this.showSpinner = false;

              } else if (name == "Examinee") {

                this.router.navigateByUrl('/quiz');

                this.showSpinner = false;

              } else {

                this.router.navigateByUrl('/SiteAdminHome');
                this.showSpinner = false;
              }
            }
          });

        this.redClassBool = true;

      }, (error: any) => {

        console.log("error = " + JSON.stringify(error));
        console.log("error = " + error.message);
        this.redClassBool = false;
        this.errMessage = 'Invalid Email & Password..!';
        this.entid = "";
        this.email = "";
        this.password = "";
        this.showSpinner = false;
      })
    } else {
      this.redClassBool = false;
      this.showSpinner = false;
      this.errMessage = 'Enter Email & Password..!';
    }
  }

  keytab(event) {
    let element = event.srcElement.nextElementSibling; // get the sibling element
    this.logInData();
  }

  ngOnInit() {
    this.userRole = '';
  }

  onRoleChange() {
    console.log('userrole', this.userRole);
    this.redClassBool = true;
    this.email = '';
    this.password = '';
    if (this.userRole === false) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }

}
