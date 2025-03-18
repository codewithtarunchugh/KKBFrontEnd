import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { APIConstant } from '../../constants/APIConstant';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IFAQRequest } from '../../Models/interfaces/questions';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private master: MasterService) {}

  getFAQByCategory(postData: IFAQRequest): Observable<any> {
    return this.master.post(
      environment.api + APIConstant.faq.getFAQByCategory,
      postData
    );
  }
}
