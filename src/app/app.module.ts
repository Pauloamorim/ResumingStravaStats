import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResumeMonthComponent } from './components/resume-month/resume-month.component';

import { HttpClientModule } from '@angular/common/http';
import { ActivityService } from './services/activity.service';

@NgModule({
  declarations: [
    AppComponent,
	ResumeMonthComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule, 
	HttpClientModule
  ],
  providers: [
	  ActivityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
