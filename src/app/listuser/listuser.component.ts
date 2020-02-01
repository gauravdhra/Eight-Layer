import { Component, OnInit } from '@angular/core';
import { ObjNgFor } from '../client-enterprise/myPipe';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnterpriseDataService } from '../enterprise-data.service';
import { Title } from '@angular/platform-browser/src/browser/title';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css'],
  providers: [EnterpriseDataService]
})
export class ListuserComponent implements OnInit {
  editData:any;
  errorMessage:any;
  id: number;
  display = "none"
  userId:any;
  emailId:any;
  private sub: any;
  header:any;
  options:any;
  UserNewName:any;
  currentUserId;any;
  public showSpinner:boolean = false;
  nameData: string[] = [];
  message:any;
  users:any;
  usersId:any;
  currentName:any;
  redClassBool:boolean = true;
  redClassBool1:boolean = true;
  constructor(private httpClient: HttpClient, private EnterpriseService: EnterpriseDataService, private route: ActivatedRoute) { 

   
  }
 //add users
  addUsers(name, email){
if(name && email)
{

  this.redClassBool = true;
  
  this.showSpinner = true;
  this.sub = this.route.params.subscribe(params => {
    this.id = +params['id']; // (+) converts string 'id' to a number
    

 });
   this.httpClient.post(
    'https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/'+this.id+'/users?role=Site Admin', 
    JSON.stringify({
      email:email,
      name:name
      }),
    {
      headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
    )}
).subscribe((data: any) => {
    
    this.redClassBool1 = true;
    this.display = "none"
    this.ngOnInit();
    this.showSpinner = false;
    this.users = ""
    this.usersId = ""

  }, (error: any) => {

    this.showSpinner = true;
    if(error.status = "401"){

        this.redClassBool1 = false;
       // alert("user allready exist")
        this.showSpinner = false;

    }
    
  })
}else{

  this.redClassBool = false;
    
}
  }
  //get edit data
  editUsers(userName:any, userId:any){
    
    
    this.UserNewName = userName;
    this.currentUserId = userId
    
    
      }
//Final data
      FinalEditData(userId){
        this.showSpinner = true;
        this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          
    
       });

        this.httpClient.put(
          'https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/'+this.id+'/users/'+this.currentUserId, 
          JSON.stringify({
            name : this.UserNewName,
            attributes : {
              "cognito_id" : "33",
              "cognito_group" : "3333"
            }
            }),
          {
            headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
          )}
      ).subscribe((data: any) => {
          
          console.log("data of put"+data);
          this.ngOnInit();
          this.showSpinner = false;
     
        }, (error: any) => {
     
          console.log("error of put"+error);
        })

      }
//getUser
getUsers(userId:any, email:any, currentName:any){

  this.sub = this.route.params.subscribe(params => {
    this.id = +params['id']; // (+) converts string 'id' to a number
    

 });
  this.userId = userId
  this.emailId = email
  this.currentName = currentName
        
          }
//deleteUser
 deleteUsers(){

  this.showSpinner = true;
  console.log("this.emailId", this.emailId);
 let body = JSON.stringify(
      {
        email: this.emailId,
    });

  this.header =  new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"));
  
  this.options = new RequestOptions({

    headers: this.header,
    body : body

  });

 this.httpClient.delete('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/'+this.id+'/users/'+this.userId, this.options).subscribe(
              result => {
    
                console.log(result)
                this.ngOnInit();
                this.showSpinner = false;
                
              },
              error => this.errorMessage = error
      ); 
          }
          /*show users popUp*/
          addpop(){

            console.log("show popUp");
            this.display = "block";

          }
          hideAddpop(){

            this.display = "none";

          } 
      
  ngOnInit() {


    this.EnterpriseService.currentMessage.subscribe(message => this.message = message);

    this.showSpinner = true;
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      

   });
  
    //  this.httpClient.get('https://g3052kpia0.execute-api.us-east-1.amazonaws.com/dev/enterprises/'+this.id+'/users/',{
       
    //              headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    //            }).subscribe(
    //              getUser => {
    //                this.editData = getUser
    //                console.log("this.editData",this.editData);
    //                this.showSpinner = false;
    //              }),
    //              error => this.errorMessage = error   
    this.httpClient.get('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/'+this.id+'/users/userlevel',{
      
                headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
              }).subscribe(
                getUser => {
                  this.editData = getUser
                  console.log("this.editData =========================",this.editData);
                  this.showSpinner = false;
                }),
                error => this.errorMessage = error   
  }

} 
