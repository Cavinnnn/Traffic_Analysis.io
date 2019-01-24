import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BackendComponent } from './backend/backend.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NavComponent } from './nav/nav.component';

const appRoutes:
  Routes = [
    { path: '', component: HomepageComponent, },
    { path: 'sign', component: SignInComponent },
    { path: 'back-end', component: BackendComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BackendComponent,
    SignInComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
