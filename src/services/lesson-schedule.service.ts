import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LessonScheduleService {

  constructor(private httpClient: HttpClient) { }

  addLesson(data) {
    return this.httpClient.post<any>("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/lessons", data);
  }

  getLessonSchedule(entid, chapterid) {
    return this.httpClient.get<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/lessons?chapter_code='+ chapterid +'&entid=' + entid);
  }

  getQuizData(entid, chapterid) {
   return this.httpClient.get<any>("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/quizeschedule?entid=" + entid + "&lessons_included=" + chapterid );
  }

  addQuizData(data) {
    return this.httpClient.post<any>("https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/quizeschedule", data);
  }

  addLessonSchedule(data) {
    return this.httpClient.post<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/lessonschedule', data);
  }

}

