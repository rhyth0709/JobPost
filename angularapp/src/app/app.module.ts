import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { ViewJobPostingsComponent } from './view-job-postings/view-job-postings.component';
import { ViewJobApplicationsComponent } from './view-job-applications/view-job-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    ViewJobPostingsComponent,
    ViewJobApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
