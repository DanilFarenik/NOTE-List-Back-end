import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NoteController } from './note.controller';
import { Note } from './note.entity';
import { NoteService } from './note.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Note])
  ],
  controllers: [NoteController],
  providers: [
    NoteService,
  ],
})
export class NoteModule { }
