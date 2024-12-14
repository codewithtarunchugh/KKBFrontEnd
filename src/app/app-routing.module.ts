import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuestionCategoryComponent } from './pages/question-category/question-category.component';
import { QuestionAnswersComponent } from './pages/question-answers/question-answers.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { SearchQuestionComponent } from './pages/search-question/search-question.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { PressMediaComponent } from './pages/press-media/press-media.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CareersComponent } from './pages/careers/careers.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { authGuard } from './core/guards/auth.guard';
import { SearchArticlesComponent } from './pages/search-articles/search-articles.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';
import { AskQuestionComponent } from './pages/ask-question/ask-question.component';
import { LawyerRegistrationComponent } from './pages/lawyer-registration/lawyer-registration.component';
import { LawyerRegistrationMaterialComponent } from './pages/lawyer-registration-material/lawyer-registration-material.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent, // Apply the site layout for user-facing pages
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      // {
      //   path: '',
      //   component: HomeComponent,
      // },
      {
        path: 'index',
        component: HomeComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },

      {
        path: 'question-category',
        component: QuestionCategoryComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'press',
        component: PressMediaComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'contact',
        component: ContactComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'about',
        component: AboutUsComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'career',
        component: CareersComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'enquiry',
        component: EnquiryComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'lawyer-registration',
        component: LawyerRegistrationComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'lawyer-registration-material',
        component: LawyerRegistrationMaterialComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'ask-question',
        component: AskQuestionComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'question-list/:categoryId',
        component: QuestionListComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'question-answers/:questionId',
        component: QuestionAnswersComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'search-question/:searchQuery',
        component: SearchQuestionComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'search-articles/:searchQuery',
        component: SearchArticlesComponent,
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'indian-kanoon/:contentType/:contentCategory/:pageName',
        component: ContentPageComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'indian-kanoon/:contentType/:contentCategory',
        component: ContentPageComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'indian-kanoon/:contentType',
        component: ContentPageComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      {
        path: 'indian-kanoon',
        component: ContentPageComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
      },
      { path: 'login', component: LoginComponent },
    ],
  },

  // Routes for the admin area under the admin layout
  {
    path: 'admin',
    children: [
      {
        path: '',
        canActivate: [authGuard],
        data: { roles: ['Admin'] },
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
      { path: 'login', component: LoginComponent },
    ],
  },

  // Lazy loaded user module
  {
    path: 'login',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'register',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: RegisterComponent,
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'forgot-password',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: ForgotPasswordComponent,
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      { path: 'register', component: ForgotPasswordComponent },
    ],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
