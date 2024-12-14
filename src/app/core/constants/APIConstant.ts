export const APIConstant = {
  user: {
    createNewUser: 'UserAuth/RegisterUser',
    getAllUsers: 'UserAuth/getAllUsers',
    login: 'UserAuth/AuthUser',
    refreshToken: 'UserAuth/Refresh',
  },
  menu: {
    getAllMenuByRole: 'Menu/GetAllMenuByRole',
    checkMenuPermission: 'Menu/CheckMenuPermission',
    getAllMenu: 'Menu/getAllMenu',
  },
  employee: {
    getAllEmployee: 'employee/getAllEmployee',
  },
  category: {
    getAllCategoryCount: 'Category/GetAllCategoriesCount',
  },
  content: {
    GetContentByPageNameCategoryContentType:
      'Category/GetContentByPageNameCategoryContentType',
    GetAllContentByCategoryAndContentType:
      'Category/GetAllContentByCategoryAndContentType',
    getArticleBySearchText: 'Category/GetSearchArticles',
  },
  question: {
    getAllQuestionByCategory: 'Category/GetAllQuestionsByCategory',
    getQuestionByQuestionId: 'Category/GetQuestionByQuestionId',
    getQuestionsBySearchText: 'Category/GetSearchQuestions',
  },
  answer: {
    getAnswersByQuestionId: 'Category/GetAnswersByQuestionId',
  },
};
