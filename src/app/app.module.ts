import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routes';
import { NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2Webstorage } from 'ngx-webstorage';
import { ImageUploadModule } from "angular2-image-upload";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { HomeComponent } from './home/home.component';
import { ClientEnterpriseComponent } from './client-enterprise/client-enterprise.component';
import { AllComponent } from './all/all.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { ChartsModule } from 'ng2-charts';
import { MainPipe } from './client-enterprise/main-pipe.module';
import { ChildComponentComponent } from './child-component/child-component.component';
import { ListuserComponent } from './listuser/listuser.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { EnterpriseDataService } from './enterprise-data.service';
//import { CsvDownloadService } from './csv-download.service';
import { FileService } from './file.service';
import { LessonsComponent } from './lessons/lessons.component';
import { ReportsComponent } from './reports/reports.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { Questiontype3Component } from './questiontype3/questiontype3.component';
import { Questiontype1Component } from './questiontype1/questiontype1.component';
import {QuestionListComponent, UniquePipe} from './question-list/question-list.component';
import { Questiontype2Component } from './questiontype2/questiontype2.component';
import { ClientsideComponent } from './clientside/clientside.component';
//import { ClienhomeComponent } from './clienhome/clienhome.component';
import { QuizeComponent } from './quize/quize.component';
import { ClientlessonsComponent } from './clientlessons/clientlessons.component';
import { SiteAdminSideComponent } from './site-admin-side/site-admin-side.component';
import { SiteAdminHomeComponent } from './site-admin-home/site-admin-home.component';
import { SiteAdminAlertComponent } from './site-admin-alert/site-admin-alert.component';
import { SiteAdminConfigComponent } from './site-admin-config/site-admin-config.component';
import { SiteAdminFeedbackComponent } from './site-admin-feedback/site-admin-feedback.component';
import { SiteAdminReportsComponent } from './site-admin-reports/site-admin-reports.component';
import {ForgotPasswordService} from './login/forgot-password.service'
import {RatingComponent} from "./rating/rating.component";
import {CloneService} from "../services/clone.service";
import {NotificationService} from "../services/notification.service";
import {NgxPaginationModule} from 'ngx-pagination';
import { ScheduleComponent } from './schedule/schedule.component';
import {QuizService} from "../services/quiz.service";
import {LessonListComponent} from "./lesson-list/lesson-list.component";
import {QuestionService} from "../services/question.service";
declare var $: any;
@NgModule({
  declarations: [
    UniquePipe,
    AppComponent,
    HomeComponent,
    ClientEnterpriseComponent,
    AllComponent,
    LoginComponent,
    ClientComponent,
    ChildComponentComponent,
    ListuserComponent,
    LoadingSpinnerComponent,
    LessonsComponent,
    ReportsComponent,
    ChaptersComponent,
    Questiontype3Component,
    Questiontype1Component,
    QuestionListComponent,
    Questiontype2Component,
    ClientsideComponent,
    //ClienhomeComponent,
    QuizeComponent,
    ClientlessonsComponent,
    SiteAdminSideComponent,
    SiteAdminHomeComponent,
    SiteAdminAlertComponent,
    SiteAdminConfigComponent,
    SiteAdminFeedbackComponent,
    SiteAdminReportsComponent,
    RatingComponent,
    ScheduleComponent,
    LessonListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage,
    routing,
    MainPipe,
    ChartsModule,
    ImageUploadModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [ UniquePipe, EnterpriseDataService, FileService, ForgotPasswordService, CloneService, NotificationService, QuizService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
