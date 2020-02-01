import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import 'path';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() itemId: number;
  @Input() comments: any;
  @Input() submit: any;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  rate = false;
  inputName: string;
  value;
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.value = this.rating;
  }
  closeModel(){
    this.rate = false;
  }
  saveRating(){
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: this.rating,
      comments: this.comments,
      submit: true
    });
  }
  counter(i: number) {
    return new Array(i);
  }
}
