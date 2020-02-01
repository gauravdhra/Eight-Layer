import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

@Injectable()
export class Constants {
   static tokenDelimeter = ",";
   static isHeaderPresentFlag = true;
   static validateHeaderAndRecordLengthFlag = true;
   static valildateFileExtenstionFlag = true;
}