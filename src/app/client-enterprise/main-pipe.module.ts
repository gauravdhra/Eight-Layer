import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';

import {ObjNgFor} from "./myPipe";

@NgModule({
  declarations:[ObjNgFor],
  imports:[CommonModule,
    FormsModule],
  exports:[ObjNgFor]
})

export class MainPipe{}