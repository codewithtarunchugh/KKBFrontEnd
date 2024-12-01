export interface IContentRequest {
  PageName?: string | null;
  Category?: string | null;
  ContentType?: string | null;
}
export interface ICategoryContentRequest {
  categoryName?: string | null;
  contentTypeName?: string | null;
  pageNumber: number;
  pageSize: number;
}
