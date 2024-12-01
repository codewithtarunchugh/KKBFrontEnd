import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IQuestion,
  IQuestionResponse,
} from 'src/app/core/Models/interfaces/questions';
import { AnswerService } from 'src/app/core/services/answer/answer.service';
import { QuestionService } from 'src/app/core/services/question/question.service';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.css'],
})
export class QuestionAnswersComponent implements OnInit {
  questionId: number = 0;
  questionList: IQuestionResponse[] = [];
  answerList: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        window.scrollTo(0, 0);
      }
    });
    if (this.route.snapshot.paramMap.get('questionId') !== null) {
      this.questionId = +this.route.snapshot.paramMap.get('questionId')!;

      this.getQuestionsByQuestion();
      this.getAnswerByQuestion();
    }
  }
  getQuestionsByQuestion() {
    this.questionService.getQuestionByQuestionId(this.questionId).subscribe(
      (response) => {
        this.questionList = response.data;
      },
      (error) => {
        console.error('Error fetching Category List with Count:', error);
        // Handle the error here (e.g., show an error message to the user)
      }
    );
  }
  getAnswerByQuestion() {
    this.answerService.getAnswerByQuestionId(this.questionId).subscribe(
      (response) => {
        this.answerList = response.data;
      },
      (error) => {
        console.error('Error fetching Category List with Count:', error);
        // Handle the error here (e.g., show an error message to the user)
      }
    );
  }
}
