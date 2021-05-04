export interface IBlog {
  id: number;
  imageUrl: string;
  smallImageUrl: string;
  title: string;
  date: string;
  text: string;
  shortText: string;
}

export interface IBlogView {
  blog: IBlog;
  cssClass: string
}
