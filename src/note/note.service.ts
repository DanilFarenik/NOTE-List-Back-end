import { Injectable } from '@nestjs/common';
import { editNote } from 'src/type';
import { getDateOfCreation, getDatesOfString, uuid } from '../util';

import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';

import noteDB from "./note.model";

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
    }

    this.noteDB.add(note);
  }

  deleteNote(id: number) {
    this.noteDB.delete(id)
  }

  editNote(dto: EditNoteDto, uuid: number) {
    const newNoteData: editNote = {}

    if (dto.name) newNoteData.name = dto.name.trim();

    if (dto.archived) newNoteData.archived = dto.archived;

    if (dto.category) newNoteData.category = dto.category;

    if (dto.text) {
      newNoteData.date = getDatesOfString(dto.text);
      newNoteData.text = dto.text.trim();
    }

    this.noteDB.edit(newNoteData, uuid)
  }

  getNote(uuid: number) {
    return this.noteDB.get(uuid)
  }
  getNotes() {
    return this.noteDB.get()
  }

  getStats() {

  }
}
