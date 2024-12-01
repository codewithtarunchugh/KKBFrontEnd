import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { APIConstant } from '../../constants/APIConstant';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private master: MasterService) {}

  getMenu(role: string): Observable<any> {
    return this.master.get(
      environment.api + APIConstant.menu.getAllMenuByRole + '?role=' + role
    );
  }
  checkMenuPermission(menuName: string, role: string): Observable<any> {
    return this.master.get(
      environment.api +
        APIConstant.menu.checkMenuPermission +
        '?menuName=' +
        menuName +
        '&role=' +
        role
    );
  }
}
