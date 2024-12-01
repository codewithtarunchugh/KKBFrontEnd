import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { environment } from 'src/environments/environment';
import { APIConstant } from '../../constants/APIConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  constructor(private master: MasterService) {}

  getAnswerByQuestionId(id: number): Observable<any> {
    return this.master.post(
      environment.api + APIConstant.answer.getAnswersByQuestionId,
      id
    );
  }
}
