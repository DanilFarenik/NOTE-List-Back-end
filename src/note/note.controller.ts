import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { ErrorScheme, Scheme } from '../doc-schemes/provider.scheme';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  @ApiResponse({ status: 201, type: Scheme })
  @ApiResponse({
    status: 400,
    type: ErrorScheme,
    description: 'Incorrect data',
  })
  async createNote(@Body() noteDto: CreateNoteDto) {
    await this.noteService.createNote(noteDto);

    return { statusCode: HttpStatus.CREATED, message: "OK" };
  }

  @Get('/stats')
  @ApiResponse({ status: 200, type: [Stats] })
  async getStats() {
    return await this.noteService.getStats();
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Scheme })
  @ApiResponse({
    status: 400,
    type: ErrorScheme,
    description: 'Incorrect data',
  })
  @ApiResponse({ status: 404, type: ErrorScheme, description: 'id not found' })
  async deleteNote(@Param('id', ParseIntPipe) uuid: number) {
    await this.noteService.deleteNote(uuid);

    return { statusCode: HttpStatus.OK, message: "OK" };
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Scheme })
  @ApiResponse({
    status: 400,
    type: ErrorScheme,
    description: 'Incorrect data',
  })
  @ApiResponse({ status: 404, type: ErrorScheme, description: 'id not found' })
  async editNote(
    @Body() noteDto: EditNoteDto,
    @Param('id', ParseIntPipe) uuid: number,
  ) {
    await this.noteService.editNote(noteDto, uuid);

    return { statusCode: HttpStatus.OK, message: "OK" };
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Note })
  @ApiResponse({
    status: 400,
    type: ErrorScheme,
    description: 'Incorrect data',
  })
  @ApiResponse({ status: 404, type: ErrorScheme, description: 'id not found' })
  async getNote(@Param('id', ParseIntPipe) uuid: number) {
    return await this.noteService.getNote(uuid);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Note] })
  async getNotes() {
    return await this.noteService.getNotes();
  }
}
