export interface TicketInterface {
  uuid: string | undefined;
  status: number | string | undefined;
  createdAt: string | undefined;
  createdBy: string | undefined;
  updatedAt: string | undefined;
  updatedBy: string | undefined;
  subject: string | undefined;
  description: string | null | undefined;
  type: string | undefined;
  project: string | undefined;
}

export class TicketModel implements TicketInterface {
  protected _createdAt: string | undefined;
  protected _createdBy: string | undefined;
  protected _description: string | null | undefined;
  protected _status: number | undefined;
  protected _subject: string | undefined;
  protected _updatedAt: string | undefined;
  protected _updatedBy: string | undefined;
  protected _uuid: string | undefined;
  protected _type: string | undefined;
  protected _project: string | undefined;

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

  get description(): string | null | undefined {
    return this._description;
  }

  set description(value: string | null | undefined) {
    this._description = value;
  }

  get status(): number | undefined {
    return this._status;
  }

  set status(value: number | undefined) {
    this._status = value;
  }

  get subject(): string | undefined {
    return this._subject;
  }

  set subject(value: string | undefined) {
    this._subject = value;
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

  get type(): string | undefined {
    return this._type;
  }

  set type(value: string | undefined) {
    this._type = value;
  }

  get project(): string | undefined {
    return this._project;
  }

  set project(value: string | undefined) {
    this._project = value;
  }
}
