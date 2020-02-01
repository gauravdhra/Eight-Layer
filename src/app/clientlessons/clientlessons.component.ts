import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjNgFor } from '../client-enterprise/myPipe';

@Component({
  selector: 'app-clientlessons',
  templateUrl: './clientlessons.component.html',
  styleUrls: ['./clientlessons.component.css']
})
export class ClientlessonsComponent implements OnInit {
  showSpinner:boolean = false;
  entId;
  lessonData;
  chapterName;
  chapterLesson;
  scheduleId:any
  chapterId:any;
  userId:any;
  display='none';
  constructor(private httpClient: HttpClient) { }


  getChapterName(chapterCode, chapterData, ScheduleId, ChapterId){
    
          console.log(chapterCode);
          this.chapterName = chapterCode
          this.chapterLesson = chapterData
          this.scheduleId = ScheduleId
          this.chapterId = ChapterId
          //this.display='block';
    
      }
      lessonsDataPopUp(){


        this.display='none';

      }

skipLessons(value){

  this.showSpinner = false;
  this.entId = localStorage.getItem("enterpriseId");

  
  this.userId = localStorage.getItem("userId")



this.httpClient.post('https://2gs6fkutxh.execute-api.us-east-1.amazonaws.com/dev/reports/lessons/'+this.entId+'/users/'+this.userId, 
  JSON.stringify({
    lesson_schedule_id:this.scheduleId,
    scheduled_status:value

    }),
  {
    headers:new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken")
  )}
).subscribe((data: any) => {

  
  if(value == "Complete"){
    
    
    this.display='block';

  }else{

    this.display='none';
  }
  console.log(data);
  this.showSpinner = false;
  // this.redClassBool = true;
  

}, (error: any) => {

  console.log("error of enterprise = "+error);
})


}



 


  ngOnInit() {

    this.showSpinner = true;
    this.entId = localStorage.getItem("enterpriseId");
    //alert("this.entId = "+this.entId);
    this.httpClient.get('https://o9dzztjg31.execute-api.us-east-1.amazonaws.com/dev/schedules/lessons/'+this.entId,
    {
      headers: new HttpHeaders().set('accesstoken', localStorage.getItem("accessToken"))
    }).subscribe(data => {

      //alert(data);
      this.lessonData = data
      console.log(this.lessonData);
      
      this.showSpinner = false;
      //this.Edata = Array.of(this.Edata);
    },(error: any) => {
      
      console.log("error = " + error);     
      
            })

  }

}
