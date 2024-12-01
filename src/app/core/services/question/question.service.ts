import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { environment } from 'src/environments/environment';
import { APIConstant } from '../../constants/APIConstant';
import { Observable } from 'rxjs';
import {
  IQuestionRequest,
  ISearchQuestionRequest,
} from '../../Models/interfaces/questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private master: MasterService) {}
  getQuestionList(postData: IQuestionRequest): Observable<any> {
    return this.master.post(
      environment.api + APIConstant.question.getAllQuestionByCategory,
      postData
    );
  }
  getQuestionByQuestionId(id: number): Observable<any> {
    return this.master.post(
      environment.api + APIConstant.question.getQuestionByQuestionId,
      id
    );
  }
  getSearchQuestionList(postData: ISearchQuestionRequest): Observable<any> {
    return this.master.post(
      environment.api + APIConstant.question.getQuestionsBySearchText,
      postData
    );
  }
}
