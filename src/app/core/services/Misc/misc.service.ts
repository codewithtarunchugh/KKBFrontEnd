import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  constructor() {}

  private modalVisibilitySubject = new BehaviorSubject<boolean>(false); // Default to modal closed
  modalVisibility$ = this.modalVisibilitySubject.asObservable();

  private callModalVisibilitySubject = new BehaviorSubject<boolean>(false); // Call Default to modal closed
  callModalVisibility$ = this.callModalVisibilitySubject.asObservable();

  private askQuestionModalVisibilitySubject = new BehaviorSubject<boolean>(
    false
  ); // Call Default to modal closed
  askQuestionModalVisibility$ =
    this.askQuestionModalVisibilitySubject.asObservable();

    private serviceEnquiryModalVisibilitySubject = new BehaviorSubject<boolean>(false); // Call Default to modal closed
    serviceEnquiryModalVisibility$ = this.serviceEnquiryModalVisibilitySubject.asObservable();

  private answerModalVisibilitySubject = new BehaviorSubject<boolean>(false); // Call Default to modal closed
  answerModalVisibility$ = this.answerModalVisibilitySubject.asObservable();

  private questionSubject = new BehaviorSubject<any | null>(null); // Store questionId
  question$ = this.questionSubject.asObservable();

  private serviceTypeSubject = new BehaviorSubject<any | null>(null); // Store questionId
  serviceType$ = this.serviceTypeSubject.asObservable();

  openModal() {
    this.modalVisibilitySubject.next(true); // Emit true to open the modal
  }

  closeModal() {
    this.modalVisibilitySubject.next(false); // Emit false to close the modal
  }
  openCallModal() {
    this.callModalVisibilitySubject.next(true); // Emit true to open the call modal
  }

  closeCallModal() {
    this.callModalVisibilitySubject.next(false); // Emit false to close the call modal
  }
  openAskQuestionModal() {
    this.askQuestionModalVisibilitySubject.next(true); // Emit true to open the Qsk Question modal
  }

  closeAskQuestionModal() {
    this.askQuestionModalVisibilitySubject.next(false); // Emit false to close the Qsk Question modal
  }
  openServiceEnquiryModal(serviceType:any) {
    this.serviceTypeSubject.next(serviceType); // Pass the questionId to the modal component
    this.serviceEnquiryModalVisibilitySubject.next(true); // Emit true to open the serviceEnquiry modal
  }

  closeServiceEnquiryModal() {
    this.serviceEnquiryModalVisibilitySubject.next(false); // Emit false to close the serviceEnquiry modal
  }
  openAnswerModal(question: any) {
    this.questionSubject.next(question.id); // Pass the questionId to the modal component
    this.answerModalVisibilitySubject.next(true); // Emit true to open the Qsk Question modal
  }

  closeAnswerModal() {
    this.answerModalVisibilitySubject.next(false); // Emit false to close the Qsk Question modal
    this.questionSubject.next(null); // Reset the questionId when modal is closed
  }
}
