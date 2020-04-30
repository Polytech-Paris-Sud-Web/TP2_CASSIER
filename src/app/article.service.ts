import { Injectable } from '@angular/core';
import { Article } from './article/article.class';
import {HttpClient} from "@angular/common/http";
import { Observable, forkJoin } from 'rxjs';

@Injectable()
export class ArticleService {

  constructor(private http : HttpClient) { }

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`http://localhost:3000/articles/${id}`);
  }

  public deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(`http://localhost:3000/articles/${id}`);
  }

  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`http://localhost:3000/articles`,article);
  }

  public filterArticle(filter: string): Observable<Article[]> {
    return this.http.get<Article[]>(`http://localhost:3000/articles?q=${filter}`);
  }

}
