export interface Note {
  name: string,
  date: string[],
  category: string,
  text: string,
  dateOfCreation: string,
  archived: boolean,
  id: number,
}


export interface editNote {
  name?: string,
  date?: string[],
  category?: string,
  text?: string,
  archived?: boolean,
}
