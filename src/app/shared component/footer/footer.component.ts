import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  flag1: string;
  flag2: string;
  flag3: string;
  id: number;
  flag4: string;

  constructor( translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('ar');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('ar');
  }
  ngOnInit() {
    this.flag4="editProfile"
    this.flag1 = 'vendor';
    this.flag2 = 'fleet'
    this.flag3 = 'user';
    this.id=1

  }

}
