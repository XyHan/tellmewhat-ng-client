import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommentInterface } from '../../../../../domain/ticket/model/comment.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentService } from '../../../../../infrastructure/ticket/service/comment/comment.service';
import { CommentServiceInterface } from '../../../../../domain/ticket/service/comment.service.interface';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() private readonly _ticketUuid: string | null;
  private _areCommentsLoading: boolean;
  private readonly _commentService: CommentServiceInterface;
  private _commentList: CommentInterface[];

  constructor(
    @Inject(CommentService) commentService: CommentServiceInterface
  ) {
    this._areCommentsLoading = true;
    this._ticketUuid = null;
    this._commentService = commentService;
    this._commentList = [];
  }

  ngOnInit(): void {
    this.listAllComments(0, 10);
  }

  get commentList(): CommentInterface[] {
    return this._commentList;
  }

  get areCommentsLoading(): boolean {
    return this._areCommentsLoading;
  }

  private listAllComments(page: number, size: number): void {
    if (!this._ticketUuid) { throw new Error('A valid ticket uuid is required'); }
    this._commentService
      .listAllComments(this._ticketUuid, page, size, [])
      .subscribe(
        results => {
          this._commentList = results.collection;
          this._areCommentsLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
          this._areCommentsLoading = false;
        }
      )
    ;
  }
}
