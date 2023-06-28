import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { ConfirmationDialogsService } from './../services/dialog/confirmation.service';
import { HttpServices } from "../services/http-services/http_services.service";
import { SetLanguageComponent } from 'app/set-language.component';

@Component({
  selector: 'app-view-version-details',
  templateUrl: './view-version-details.component.html',
  styleUrls: ['./view-version-details.component.css']
})
export class ViewVersionDetailsComponent implements OnInit {

  version_UI: any;
  commitID_UI: any;
  version_api: any;
  currentLanguageSet: any;

  constructor(
    @Inject(MD_DIALOG_DATA) public input: any,
    public dialogRef: MdDialogRef<ViewVersionDetailsComponent>,
    private confirmationDialogsService: ConfirmationDialogsService,
    public HttpServices: HttpServices) { }

  ngOnInit() {
    this.assignSelectedLanguage();
    console.log("input", this.input)
   
  }
  ngDoCheck() {
    this.assignSelectedLanguage();
  } 
  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.HttpServices);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }
  uiVersionDetails(versionDetails) {
    this.version_UI = versionDetails.version;
    this.commitID_UI = versionDetails.commit;
  }
}