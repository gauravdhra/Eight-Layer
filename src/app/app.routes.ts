import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { LoginComponent } from './login/login.component';
import { ClientEnterpriseComponent } from './client-enterprise/client-enterprise.component';
import { ListuserComponent } from './listuser/listuser.component';
import { LessonsComponent } from './lessons/lessons.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ReportsComponent } from './reports/reports.component';
import { Questiontype1Component } from './questiontype1/questiontype1.component';
import { Questiontype2Component } from './questiontype2/questiontype2.component';
import { Questiontype3Component } from './questiontype3/questiontype3.component';
import { QuestionListComponent } from './question-list/question-list.component';
//import { ClienhomeComponent } from './clienhome/clienhome.component';
import { QuizeComponent } from './quize/quize.component';
import { ClientlessonsComponent } from './clientlessons/clientlessons.component';
import { SiteAdminHomeComponent } from './site-admin-home/site-admin-home.component';
import { SiteAdminAlertComponent } from './site-admin-alert/site-admin-alert.component';
import { SiteAdminConfigComponent } from './site-admin-config/site-admin-config.component';
import { SiteAdminFeedbackComponent } from './site-admin-feedback/site-admin-feedback.component';
import { SiteAdminReportsComponent } from './site-admin-reports/site-admin-reports.component';
import {ScheduleComponent} from "./schedule/schedule.component";
import {LessonListComponent} from "./lesson-list/lesson-list.component";


const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'SuperAdmin', component: AllComponent, pathMatch: 'full' },
    { path: 'client', component: ClientEnterpriseComponent, pathMatch: 'full' },
    { path: 'client/listuser/:id', component:  ListuserComponent, pathMatch: 'full' },
    { path: 'lessons', component:  LessonsComponent, pathMatch: 'full' },
    { path: 'reports', component:  ReportsComponent, pathMatch: 'full' },
    { path: 'chapter', component:  ChaptersComponent, pathMatch: 'full' },
    { path: 'type1/:lId', component:  Questiontype1Component, pathMatch: 'full' },
    { path: 'type2/:lId', component:  Questiontype2Component, pathMatch: 'full' },
    { path: 'type3/:lId', component:  Questiontype3Component, pathMatch: 'full' },
    { path: 'questionlist/:lessonId/:chapname', component:  QuestionListComponent, pathMatch: 'full' },
    { path: 'lessonlist/:chapterId/:entid', component:  LessonListComponent, pathMatch: 'full' },
    //{ path: 'Clienthome', component: ClienhomeComponent, pathMatch: 'full' },
    { path: 'quiz', component: QuizeComponent, pathMatch: 'full' },
    { path: 'ScheduledLesson', component: ClientlessonsComponent, pathMatch: 'full' },
    { path: 'SiteAdminHome', component: SiteAdminHomeComponent, pathMatch: 'full' },
    { path: 'SiteAdminAlert', component: SiteAdminAlertComponent, pathMatch: 'full' },
    { path: 'SiteAdminConfig', component: SiteAdminConfigComponent, pathMatch: 'full' },
    { path: 'SiteAdminFeedback', component: SiteAdminFeedbackComponent, pathMatch: 'full' },
    { path: 'SiteAdminReports', component: SiteAdminReportsComponent, pathMatch: 'full' },
    { path: 'schedule', component: ScheduleComponent, pathMatch: 'full' }



  ];

export  const routing = RouterModule.forRoot(routes);
