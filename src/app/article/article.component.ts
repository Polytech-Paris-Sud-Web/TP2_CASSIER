import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from './article.class';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input("article")
  article: Article;

  @Output("askForDelete")
  deleteArticle: EventEmitter<Article> = new EventEmitter<Article>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  get title(): string {
    return this.article.title;
  }

  get content(): string {
    return this.article.content;
  }

  get authors(): string {
    return this.article.authors;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if ("id" in params) {
        const id = params.id;
        this.articleService.getArticle(id).subscribe(
          (article) => this.article = article,
          () => console.error("cannot load article: ", id)
        )
      }
    })
  }

  delete(): void {
    const id = this.article.id;
    this.articleService.deleteArticle(id).subscribe(
      () =>　{
        this.deleteArticle.emit(this.article);
        this.router.navigate(['/articles']);
      },
      (error) => console.error('cannot delete article: ',id, error)
    );

  }

}
