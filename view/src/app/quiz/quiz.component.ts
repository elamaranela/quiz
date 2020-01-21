import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, public quizService: QuizService) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      console.log('iam insude ngonint');
      this.quizService.button = 'Next'
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns[1] = JSON.parse(localStorage.getItem('qns'));
      if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else {
      console.log('in else part');
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data: any) => {
          this.quizService.button = 'Next'
          this.quizService.qns = Object.keys(data).map((k) => data[k]);// data;
          this.startTimer();
        }
      );
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 200);
  }

  Answer(qID, choice) {
    this.quizService.qns[1][this.quizService.qnProgress].userAnswer = choice;
    console.log(' this.quizService.answer[choice])', this.quizService.answer[choice])
    console.log(' this.quizService.qns[1][this.quizService.qnProgress].answer[]', this.quizService.qns[1][this.quizService.qnProgress].answer['0'])
    if(this.quizService.qns[1][this.quizService.qnProgress].answer['0'] == this.quizService.answer[choice]){
      this.quizService.correctAnswerCount++
    }
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if(this.quizService.qnProgress == 9){
      this.quizService.button = 'Complete'
    }
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }
  Previous(qID, choice) {
    this.quizService.qns[1][this.quizService.qnProgress].userAnswer = choice;
    const savedData = JSON.parse(localStorage.getItem('qns'));
    this.quizService.qnProgress--;
    this.quizService.qns[1][this.quizService.qnProgress] = savedData[1][this.quizService.qnProgress];
    
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }
  onAnswerChange(value){
    this.quizService.userAnswer = value;
 }

}
