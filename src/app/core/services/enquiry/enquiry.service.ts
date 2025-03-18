import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { environment } from 'src/environments/environment';
import { APIConstant } from '../../constants/APIConstant';
import { Observable } from 'rxjs';
import { IEnquiryRequest } from '../../Models/interfaces/content';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private master: MasterService) {}

  InsertEnquiry(postData: IEnquiryRequest): Observable<any> {
    
    return this.master.post(
      environment.api + APIConstant.enquiry.InsertEnquiry,
      postData
    );
  }
}

