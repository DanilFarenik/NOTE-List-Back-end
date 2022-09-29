import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';
import { NoteService } from "./note.service";

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  createNote(@Body() noteDto: CreateNoteDto) {
    this.noteService.createNote(noteDto);

    return { status: "OK" };
  }

  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) uuid: number) {
    this.noteService.deleteNote(uuid);

    return { status: "OK" };
  }

  @Patch(':id')
  editNote(@Body() noteDto: EditNoteDto, @Param('id', ParseIntPipe) uuid: number) {
    this.noteService.editNote(noteDto, uuid);

    return { status: "OK" };
  }

  @Get(':id')
  getNote(@Param('id', ParseIntPipe) uuid: number) {
    return this.noteService.getNote(uuid);
  }

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Get()
  getStats() {

  }
}
