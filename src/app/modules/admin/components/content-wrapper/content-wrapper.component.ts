import { Component } from '@angular/core';
import { CommonConstant } from 'src/app/core/constants/CommonConstant';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.css'],
})
export class ContentWrapperComponent {
  constructor(private common: CommonService) {
    this.common.loadCSS(CommonConstant.CssForDashboard.cssFiles);
    this.common.loadJS(CommonConstant.JsForDashboard.jsFiles);
  }
}
