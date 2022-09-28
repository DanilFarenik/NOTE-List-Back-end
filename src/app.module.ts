import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    NoteModule,
    ConfigModule.forRoot({
      envFilePath: ".env"
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
