import { NotFoundException } from '@nestjs/common';
import { IEditNote } from './interface/note-edit.interface';
import { db } from 'src/util';

export class NoteDB {
  private db;

  constructor() {
    this.db = db;
  }

  private searchIndexNote(uuid: number) {
    for (let i = 0; i < this.db.length; i++) {
      if (this.db[i].id === uuid) return i;
    }
  }

  public add(note) {
    this.db.push(note);
  }

  public delete(uuid: number) {
    const id: number | undefined = this.searchIndexNote(uuid);

    if (id === undefined)
      throw new NotFoundException(`note is not found - ${uuid}`);

    this.db = [
      ...this.db.slice(0, id),
      ...this.db.slice(id + 1, this.db.length),
    ];
  }

  public edit(note: IEditNote, uuid: number) {
    const id: number | undefined = this.searchIndexNote(uuid);

    if (id === undefined)
      throw new NotFoundException(`note is not found - ${uuid}`);

    this.db = [
      ...this.db.slice(0, id),
      { ...this.db[id], ...note },
      ...this.db.slice(id + 1, this.db.length),
    ];
  }

  public get(uuid?: number) {
    if (!uuid) return this.db;

    const id: number | undefined = this.searchIndexNote(uuid);

    if (id === undefined)
      throw new NotFoundException(`note is not found - ${uuid}`);

    return this.db[id];
  }
}

export default new NoteDB();
