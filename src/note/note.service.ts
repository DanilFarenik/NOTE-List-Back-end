import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { uuid } from '../util';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';
import { IAccumulateStats } from './interface/accumulate-stats.interface';
import { IEditNote } from './interface/note-edit.interface';
import { IStats } from './interface/stats.interface';
import { Note } from './note.entity';


@Injectable()
export class NoteService {

  constructor(@InjectModel(Note) private noteRepository: typeof Note) { }

  async createNote(dto: CreateNoteDto) {
    const note = {
      name: dto.name.trim(),
      category: dto.category,
      text: dto.text.trim(),
      archived: false,
    };

    await this.noteRepository.create(note);
  }

  async deleteNote(uuid: number) {
    const note = await this.noteRepository.destroy({ where: { id: uuid } });

    if (!note) throw new NotFoundException(`note is not found - ${uuid}`);

    return note;
  }

  async editNote(dto: EditNoteDto, uuid: number) {
    const newNoteData: IEditNote = {};

    if (dto.name) newNoteData.name = dto.name.trim();
    if (dto.archived) newNoteData.archived = dto.archived;
    if (dto.category) newNoteData.category = dto.category;
    if (dto.text) newNoteData.text = dto.text.trim();

    const note = await this.noteRepository.update(newNoteData, { where: { id: uuid } });

    if (!note[0]) throw new NotFoundException(`note is not found - ${uuid}`);
  }

  async getNote(uuid: number): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id: uuid } });

    if (!note) throw new NotFoundException(`note is not found - ${uuid}`);

    return note;
  }

  async getNotes(): Promise<Note[]> {
    return this.noteRepository.findAll();
  }

  async getStats(): Promise<IStats[]> {
    const notes: Note[] = await this.noteRepository.findAll();

    const stats = notes.reduce<IAccumulateStats>((accumulate, note) => {
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
