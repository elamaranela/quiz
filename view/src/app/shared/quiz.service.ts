import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {
  //---------------- Properties---------------
  readonly rootUrl = 'http://localhost:4000/api/v1/quiz';
  qns: any[];
  answer:any = {'0':'a','1':'b','2':'c','3':'d','4':'e'};
  seconds: number;
  timer;
  button:String;
  qnProgress: number;
  userAnswer:number;
  correctAnswerCount: number = 0;

  //---------------- Helper Methods---------------
  constructor(private http: HttpClient) { }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.message.name;
  }


  //---------------- Http Methods---------------

  insertParticipant(name: string, email: string) {
    var body = {
      Name: name,
      Email: email
    }
    return this.http.post(this.rootUrl + '/addparticipant', body);
  }

  getQuestions() {
    return this.http.get(this.rootUrl + '/1');
  }

  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }

}
