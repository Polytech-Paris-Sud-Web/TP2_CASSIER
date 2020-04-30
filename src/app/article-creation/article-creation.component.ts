import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Article } from '../article/article.class';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  articleForm : FormGroup;

  @Output("articleCreated")
  createArticle: EventEmitter<Article> = new EventEmitter<Article>();

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: ['Fake Title', Validators.required ],
      content : ['', Validators.required ],
      authors : ['', Validators.required ],
    });
  }

  ngOnInit(): void {
  }

  create(){
    this.articleService.addArticle(this.articleForm.value).subscribe(
      (value) => this.createArticle.emit(value),
      (error) => console.error('error while creating article', error)
    );
  }

}
