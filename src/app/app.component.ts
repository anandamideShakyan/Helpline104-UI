import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
import { SecurityInterceptedHttp } from './http.securityinterceptor';
import { InterceptedHttp } from './http.interceptor';
//import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
/*
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'hy']);
    translate.setDefaultLang('en');
    translate.use('en');
  }
  changeLang(lang: string) {
    this.translate.use(lang);
  } */

  isConnected: Observable<boolean>;

  constructor(private httpInterceptor: InterceptedHttp, private securityInterceptor: SecurityInterceptedHttp){
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
  }
  ngOnInit(){
    this.isConnected.subscribe((bool)=>{
      this.httpInterceptor.onlineFlag = bool;
      this.securityInterceptor.onlineFlag = bool;
    });
  }
  
}