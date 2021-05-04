import {AfterViewInit, Component, DEFAULT_CURRENCY_CODE, Inject, Input, OnChanges} from '@angular/core';
import {JQ_TOKEN} from '../common/jquery.service';
import {IBlog, IBlogView} from './blogs.model';
import {BlogsService} from './blogs.service';
import {DictionaryService} from './dictionary.service';
import {ICategory} from './dictionary.model';

@Component({
  templateUrl: 'blogs.component.html'
})
export class BlogsComponent implements AfterViewInit {
  readonly DEFAULT_CATEGORY: ICategory = {id: 0, name: 'All'};

  @Input()
  selectedCategory: ICategory = this.DEFAULT_CATEGORY;

  @Input()
  searchText = '';

  blogs: IBlogView[] = [];
  filteredBlogs: IBlogView[] = [];
  categories: ICategory[] = [];

  constructor(@Inject(JQ_TOKEN) private $: any,
              private blogsService: BlogsService,
              private dictionaryService: DictionaryService) {
  }

  searchBlog(): void {
    this.selectedCategory = this.DEFAULT_CATEGORY;
    if (this.searchText !== '') {
      this.filteredBlogs = this.blogs.filter(blog => blog.blog.shortText.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.filteredBlogs = this.blogs;
    }
  }

  handleSelectCategory(cat: ICategory, e: any): void {
    this.selectedCategory = cat;
    this.$('.category__dropdown-box').removeClass('shown');
    e.stopPropagation();
    this.filterBlogs();
    this.searchText = '';
  }

  private filterBlogs(): void {
    if (this.selectedCategory.id !== 0) {
      this.filteredBlogs = this.blogs.filter(blog => blog.blog.categoryId === this.selectedCategory.id);
    } else {
      this.filteredBlogs = this.blogs;
    }
  }

  ngAfterViewInit(): void {
    this.bindClickEventsToDropdowns();
    this.fetchBlogs();
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.dictionaryService.fetchCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  fetchBlogs(): void {
    this.blogsService.fetchBlogs().subscribe(blogs => {
      let cssClass1 = 'col-lg-4';
      let cssClass2 = 'col-lg-8';
      for (let i = 0; i < blogs.length; i += 2) {
        const blog1: IBlogView = {
          blog: blogs[i],
          cssClass: cssClass1
        };
        const blog2: IBlogView = {
          blog: blogs[i + 1],
          cssClass: cssClass2
        };
        this.blogs.push(blog1, blog2);
        this.filteredBlogs = this.blogs;
        [cssClass1, cssClass2] = [cssClass2, cssClass1];
      }
    });
  }

  bindClickEventsToDropdowns(): void {
    setTimeout(() => {
      this.$('.category__dropdown').on('click', (e: any) => {
        if ((this.$(e.target).parents().hasClass('category__dropdown'))
          && !(this.$('.category__dropdown-box').hasClass('shown'))) {
          this.$('.category__dropdown-box').addClass('shown');
        } else if ((this.$(e.target).parents().hasClass('category__dropdown-info'))
          && (this.$('.category__dropdown-box').hasClass('shown'))) {
          this.$('.category__dropdown-box').removeClass('shown');
        }
      });

      this.$(window).on('click', (e: any) => {
        if (!(this.$(e.target).parents().hasClass('category__dropdown'))) {
          this.$('.category__dropdown-box').removeClass('shown');
        }
      });
    }, 500);
  }
}
