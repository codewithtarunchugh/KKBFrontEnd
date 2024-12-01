import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIConstant } from '../../constants/APIConstant';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private master: MasterService) {}
  getCategoryCountList(): Observable<any> {
    return this.master.get(
      environment.api + APIConstant.category.getAllCategoryCount
    );
  }
}
