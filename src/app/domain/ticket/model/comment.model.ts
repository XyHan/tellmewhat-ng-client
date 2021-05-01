export interface CommentInterface {
  uuid: string | undefined;
  status: number | string | undefined;
  createdAt: string | undefined;
  createdBy: string | undefined;
  updatedAt: string | undefined;
  updatedBy: string | undefined;
  content: string | undefined;
}

export class CommentModel implements CommentInterface {
  protected _createdAt: string | undefined;
  protected _createdBy: string | undefined;
  protected _content: string | undefined;
  protected _status: number | undefined;
  protected _updatedAt: string | undefined;
  protected _updatedBy: string | undefined;
  protected _uuid: string | undefined;

  get createdAt(): string | undefined {
    return this._createdAt;
  }

  set createdAt(value: string | undefined) {
    this._createdAt = value;
  }

  get createdBy(): string | undefined {
    return this._createdBy;
  }

  set createdBy(value: string | undefined) {
    this._createdBy = value;
  }

  get content(): string | undefined {
    return this._content;
  }

  set content(value: string | undefined) {
    this._content = value;
  }

  get status(): number | undefined {
    return this._status;
  }

  set status(value: number | undefined) {
    this._status = value;
  }

  get updatedAt(): string | undefined {
    return this._updatedAt;
  }

  set updatedAt(value: string | undefined) {
    this._updatedAt = value;
  }

  get updatedBy(): string | undefined {
    return this._updatedBy;
  }

  set updatedBy(value: string | undefined) {
    this._updatedBy = value;
  }

  get uuid(): string | undefined {
    return this._uuid;
  }

  set uuid(value: string | undefined) {
    this._uuid = value;
  }
}
