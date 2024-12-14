import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/Header/header.component';
import { FooterComponent } from './shared/Footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuestionCategoryComponent } from './pages/question-category/question-category.component';
import { QuestionAnswersComponent } from './pages/question-answers/question-answers.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { RightSideAdComponent } from './shared/right-side-ad/right-side-ad.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SearchQuestionComponent } from './pages/search-question/search-question.component';
import { FormsModule } from '@angular/forms';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PressMediaComponent } from './pages/press-media/press-media.component';
import { SanitizeHtmlPipe } from './core/pipe/sanitize-html-pipe.pipe';
import { QuestionBoxComponent } from './shared/question-box/question-box.component';

import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LocalDataServiceService } from './core/services/LocalDataService/local-data-service.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { SearchArticlesComponent } from './pages/search-articles/search-articles.component';
import { EnquiryComponent } from './pages/enquiry/enquiry.component';
import { AskQuestionComponent } from './pages/ask-question/ask-question.component';
import { LawyerRegistrationComponent } from './pages/lawyer-registration/lawyer-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { LawyerRegistrationMaterialComponent } from './pages/lawyer-registration-material/lawyer-registration-material.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    QuestionCategoryComponent,
    QuestionAnswersComponent,
    QuestionListComponent,
    RightSideAdComponent,
    BreadcrumbComponent,
    SearchQuestionComponent,
    ContentPageComponent,
    AboutUsComponent,
    CareersComponent,
    ContactComponent,
    PressMediaComponent,
    SignupComponent,
    SanitizeHtmlPipe,
    QuestionBoxComponent,
    SiteLayoutComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SearchArticlesComponent,
    EnquiryComponent,
    AskQuestionComponent,
    LawyerRegistrationComponent,
    LawyerRegistrationMaterialComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, // Material button
    MatInputModule, // Material input
    MatSelectModule, // Material select dropdown
    MatFormFieldModule, // Material form field
    MatCheckboxModule,
  ],
  providers: [
    LocalDataServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
