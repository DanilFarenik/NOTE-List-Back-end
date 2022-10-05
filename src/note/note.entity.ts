import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model, DataType } from 'sequelize-typescript';
import { INote } from './interface/note.interface';

@Table({ tableName: 'notes' })
export class Note extends Model implements INote {
  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: 'Note 1', description: 'Note title' })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: 'task', description: 'Note category' })
  category: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @ApiProperty({ example: 'Lorem ips the...', description: 'Note body' })
  text: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  @ApiProperty({ example: true, description: 'Whether notes are archived' })
  archived: boolean;

  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  @ApiProperty({ example: 203213213, description: 'Unique id' })
  id: number;
}
