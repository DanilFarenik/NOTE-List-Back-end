import { Injectable } from '@nestjs/common';
import { getDateOfCreation, getDatesOfString, uuid } from '../util';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';
import { IAccumulateStats } from './interface/accumulate-stats.interface';
import { IEditNote } from './interface/note-edit.interface';
import { INote } from './interface/note.interface';
import { IStats } from './interface/stats.interface';
import noteDB from './note.model';

@Injectable()
export class NoteService {
  noteDB: typeof noteDB;

  constructor() {
    this.noteDB = noteDB;
  }

  createNote(dto: CreateNoteDto) {
    const note = {
      name: dto.name.trim(),
      date: getDatesOfString(dto.text),
      category: dto.category,
      text: dto.text.trim(),
      dateOfCreation: getDateOfCreation(),
      archived: false,
      id: uuid(),
    };

    this.noteDB.add(note);
  }

  deleteNote(id: number) {
    this.noteDB.delete(id);
  }

  editNote(dto: EditNoteDto, uuid: number) {
    const newNoteData: IEditNote = {};

    if (dto.name) newNoteData.name = dto.name.trim();

    if (dto.archived) newNoteData.archived = dto.archived;

    if (dto.category) newNoteData.category = dto.category;

    if (dto.text) {
      newNoteData.date = getDatesOfString(dto.text);
      newNoteData.text = dto.text.trim();
    }

    this.noteDB.edit(newNoteData, uuid);
  }

  getNote(uuid: number): INote {
    return this.noteDB.get(uuid);
  }

  getNotes(): INote[] {
    return this.noteDB.get();
  }

  getStats(): IStats[] {
    const stats: IAccumulateStats = this.noteDB
      .get()
      .reduce((accumulate, note) => {
        if (!accumulate[note.category]) {
          accumulate[note.category] = { active: 0, archive: 0 };
        }

        !note.archived
          ? ++accumulate[note.category].active
          : ++accumulate[note.category].archive;

        return accumulate;
      }, {});

    return Object.entries(stats).map((item) => ({
      name: item[0],
      id: uuid(),
      ...item[1],
    }));
  }
}
