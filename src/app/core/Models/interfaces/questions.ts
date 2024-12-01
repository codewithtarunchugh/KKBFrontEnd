export interface IQuestionRequest {
  categoryID?: number;
  pageSize?: number;
  pageIndex?: number;
}
export interface IQuestion {
  questionId?: number;
}
export interface IQuestionResponse {
  id: number;
  questionText: string;
  userQuestionText: string;
}
export interface ISearchQuestionRequest {
  searchQuery?: string;
  categoryID?: number;
  pageSize?: number;
  pageIndex?: number;
}
