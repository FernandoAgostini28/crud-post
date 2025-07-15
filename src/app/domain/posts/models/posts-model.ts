export class Post {
  constructor(
    private _id: number,
    private _title: string,
    private _description: string,
    private _photo: string
  ) {}

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value.trim();
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get photo(): string {
    return this._photo;
  }

  set photo(value: string) {
    this._photo = value;
  }

  get shortDescription(): string {
    return this._description.length > 60
      ? this._description.slice(0, 60) + '...'
      : this._description;
  }
}
