import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ViewJobPostingsComponent } from './view-job-postings/view-job-postings.component';
import { ViewJobApplicationsComponent } from './view-job-applications/view-job-applications.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    ViewJobPostingsComponent,
    ViewJobApplicationsComponent,
    JobApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
