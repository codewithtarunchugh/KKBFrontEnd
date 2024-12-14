import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { environment } from 'src/environments/environment';
import { APIConstant } from '../../constants/APIConstant';
import { Observable } from 'rxjs';
import {
  ICategoryContentRequest,
  IContentRequest,
} from '../../Models/interfaces/content';
import { ISearchQuestionRequest } from '../../Models/interfaces/questions';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private master: MasterService) {}
  getContentByPageNameCategoryContentType(
    postData: IContentRequest
  ): Observable<any> {
    return this.master.post(
      environment.api +
        APIConstant.content.GetContentByPageNameCategoryContentType,
      postData
    );
  }
  GetAllContentByCategoryAndContentType(
    postData: ICategoryContentRequest
  ): Observable<any> {
    return this.master.post(
      environment.api +
        APIConstant.content.GetAllContentByCategoryAndContentType,
      postData
    );
  }
  getSearchArticleList(postData: ISearchQuestionRequest): Observable<any> {
    return this.master.post(
      environment.api + APIConstant.content.getArticleBySearchText,
      postData
    );
  }
}
