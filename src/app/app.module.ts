import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BackendComponent } from './backend/backend.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NavComponent } from './nav/nav.component';
import { BackgroundComponent } from './background/background.component';
import { RegisterComponent } from './register/register.component';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/material.module';
import { SidenavComponent } from './backend/sidenav/sidenav.component';

const appRoutes:
  Routes = [
    { path: '', component: HomepageComponent, },
    { path: 'sign', component: SignInComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'back-end', component: BackendComponent },
    { path: 'side', component: SidenavComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'}
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BackendComponent,
    SignInComponent,
    NavComponent,
    BackgroundComponent,
    RegisterComponent,
    SidenavComponent,
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
