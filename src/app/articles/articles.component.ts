import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article.class';
import { ArticleService } from '../article.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = []
  filterValue: string = '';

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
   this.articleService.getArticles().subscribe(
      (value) =>　this.articles = value,
      (error) => console.error('Cannot load articles: ', error)
    );
  }

  removeArticle(id: number): void {
    this.articles = this.articles.filter(a => a.id != id)
  }

  addArticle(article: Article): void {
    this.articles.push(article);
  }

  filterArticle(filter: string): void {
    this.articleService.filterArticle(filter).subscribe(
      (articles) => this.articles = articles,
      (error) =>　console.log('cannot filter articles')
    );
  }

}
