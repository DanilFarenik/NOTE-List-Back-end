import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Stats } from './stats.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { EditNoteDto } from './dto/edit-note.dto';
import { Note } from './note.entity';
import { NoteService } from './note.service';
import { ErrorScheme } from 'src/doc-schemes/error.scheme';
import { SuccessScheme } from 'src/doc-schemes/success.scheme';

@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @ApiResponse({ status: 200, type: SuccessScheme })
  @ApiResponse({
    status: 400,
    type: ErrorScheme,
    description: 'Incorrect data',
  })
  createNote(@Body() noteDto: CreateNoteDto) {
    this.noteService.createNote(noteDto);

    return { status: 'OK' };
  }

  @Get('/stats')
  @ApiResponse({ status: 200, type: [Stats] })
  getStats() {
    return this.noteService.getStats();
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: SuccessScheme })
  @ApiResponse({
    status: 400,
    type: ErrorScheme,
    description: 'Incorrect data',
  })
  @ApiResponse({ status: 404, type: ErrorScheme, description: 'id not found' })
  deleteNote(@Param('id', ParseIntPipe) uuid: number) {
    this.noteService.deleteNote(uuid);

    return { status: 'OK' };
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: SuccessScheme })
  @ApiResponse({
    status: 400,
    type: ErrorScheme,
    description: 'Incorrect data',
  })
  @ApiResponse({ status: 404, type: ErrorScheme, description: 'id not found' })
  editNote(
    @Body() noteDto: EditNoteDto,
    @Param('id', ParseIntPipe) uuid: number,
  ) {
    this.noteService.editNote(noteDto, uuid);

    return { status: 'OK' };
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Note })
  @ApiResponse({
    status: 400,
    type: ErrorScheme,
    description: 'Incorrect data',
  })
  @ApiResponse({ status: 404, type: ErrorScheme, description: 'id not found' })
  getNote(@Param('id', ParseIntPipe) uuid: number) {
    return this.noteService.getNote(uuid);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Note] })
  getNotes() {
    return this.noteService.getNotes();
  }
}
