import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  editQuestionConfirm(question_code) {
    return this.httpClient.get<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/questions/getquestionstatusforanswer?question_code=' + question_code)
  }

  getQuestion(userId, chapterCode, entid) {
    return this.httpClient.get<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/quize/listofquestions?user_id=' + userId + '&chapter_code=' + chapterCode+ '&entid=' + entid);
  }
  editQuestion(data) {
    return this.httpClient.post<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/questions', data);
  }

  deleteQuestion(question_code) {
   return this.httpClient.delete<any>('https://gvb0azqv1e.execute-api.us-east-1.amazonaws.com/dev/questions?question_code=' + question_code);
  }

}

