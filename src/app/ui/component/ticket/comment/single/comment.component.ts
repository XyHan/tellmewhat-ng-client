import { Component, Input } from '@angular/core';
import { CommentInterface } from '../../../../../domain/ticket/model/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() private readonly _comment: CommentInterface | null;

  constructor() {
    this._comment = null;
  }


  get comment(): CommentInterface | null {
    return this._comment;
  }
}
