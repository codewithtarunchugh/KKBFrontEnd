import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  IQuestion,
  IQuestionResponse,
} from 'src/app/core/Models/interfaces/questions';
import { AnswerService } from 'src/app/core/services/answer/answer.service';
import { MiscService } from 'src/app/core/services/Misc/misc.service';
import { QuestionService } from 'src/app/core/services/question/question.service';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.css'],
})
export class QuestionAnswersComponent implements OnInit {
  names: string[] = [
    'Advocate Vishal', 'Advocate Rohit', 'Advocate Pooja', 
    'Advocate Ankit', 'Advocate Neha', 'Advocate Suresh', 
    'Advocate Ramesh', 'Advocate Priya', 'Advocate Deepak', 
    'Advocate Manisha'
  ];
  randomName: string = '';
  modalSubscription: Subscription = new Subscription();
  answerSubscription: Subscription = new Subscription();
  isAnswerModalOpen = true; // Control the modal visibility
  questionId: number = 0;
  questionList: IQuestionResponse[] = [];
  answerList: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private sanitizer: DomSanitizer,
    private miscService: MiscService
  ) { }
  randomAdvocateName(): string {
    const names = [
      'Advocate Vishal', 'Advocate Rohit', 'Advocate Pooja', 'Advocate Ankit',
      'Advocate Neha', 'Advocate Suresh', 'Advocate Ramesh', 'Advocate Priya',
      'Advocate Deepak', 'Advocate Manisha'
    ];
    return names[Math.floor(Math.random() * names.length)];
  }
  ngOnInit(): void {
    // Subscribe to modal visibility changes from the service
    this.modalSubscription = this.miscService.answerModalVisibility$.subscribe(
      (isOpen) => {
        this.isAnswerModalOpen = isOpen;
        this.answerSubscription = this.miscService.question$.subscribe((id) => {
          this.questionId = id;
        });
        if (this.questionId != null) {
          this.getQuestionsByQuestion();
          this.getAnswerByQuestion();
        }
      }
    );
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
    if (this.answerSubscription) {
      this.answerSubscription.unsubscribe();
    }
  }
  closeAnswerModal(): void {
    this.isAnswerModalOpen = false;
    this.miscService.closeAskQuestionModal(); // Close modal using the service
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
  getSanitizedContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
