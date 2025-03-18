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
export interface IEnquiryRequest {
  EnquiryType?: string | null;
  CaseType?: string | null;
  CaseCategory?: string | null;
  State?: string | null;
  City?: string | null;
  Pincode?: string | null;
  Howfound?: string | null;
  Title ?: string | null;
  FirstName?: string | null;
  LastName?: string | null;
  Email?: string | null;
  Phone?: string | null;
  Remarks ?: string | null;
  Subject?: string | null;
  Question?: string | null;
}
