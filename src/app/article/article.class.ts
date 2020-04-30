import * as uuid from 'uuid';

export interface Article {
  id?: uuid;
  title: string;
  content: string;
  authors: string;
}
