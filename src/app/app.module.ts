import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import { AppComponent } from './app.component';
import { DemoComponentComponent } from './components/navigationBar/navigationBar.component';
import { HighlightDirective } from './directives/highlight.directive';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import {RouterModule, Routes} from "@angular/router";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import {FormsModule , NgForm} from '@angular/forms';
import { HideElementDirective } from './directives/hide-element.directive';
import { AdminComponent } from './components/admin/admin.component';
import { MapComponent } from './components/map/map.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { QuestionforumComponent } from './components/questionforum/questionforum.component';
import { FooterComponent } from './components/footer/footer.component';
import { RemoveStylesDirective } from './directives/remove-styles.directive';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { TablelistComponent } from './components/tablelist/tablelist.component';
import { QuestionroomComponent } from './components/questionroom/questionroom.component';
import { QuestionfeedComponent } from './components/questionfeed/questionfeed.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import {ChatService} from "./app_services/chat/chat.service";
import {AuthService} from "./app_services/auth/auth.service";
import { QuestionformComponent } from './components/questionform/questionform.component';
import { MessageComponent } from './components/message/message.component';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { HelplineCenterComponent } from './components/helpline-center/helpline-center.component';
import {MessagingService} from "./app_services/messaging/messaging.service";
import {FirebaseAuthService} from "./app_services/firebase-auth/firebase-auth.service";
import {FcmPushService} from "./app_services/fcm-push/fcm-push.service";
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { HighlightQaDirective } from './directives/highlight-qa.directive';
import { LogsComponent } from './components/logs/logs.component';


const appRoutes: Routes= [
  {path:'', component:HomeComponentComponent},

  {path:'home', component:HomeComponentComponent},
  {path:'contact', component:ContactComponent},
  {path:'about', component:AboutComponent},
  {path:'activities', component:ActivitiesComponent},
  {path:'services', component:ServicesComponent},
  {path:'main_admin',
    component:MainAdminComponent,

    children : [
      {path:'', component:UserprofileComponent},
      {path:'map', component:MapComponent},
      {path:'notification', component:NotificationComponent},
      {path:'questionforum', component:QuestionforumComponent},
      {path:'userprofile', component:UserprofileComponent},
      {path:'tablelist', component:TablelistComponent},
      {path:'questionroom', component :QuestionroomComponent},
      {path:'helpline', component :HelplineCenterComponent},
      {path:'registeruser', component :RegisterUserComponent},
      {path:'updateuser', component:UpdateUserComponent},
      {path:'logs', component:LogsComponent},
    ]
  },
  {path:'admin',
    component:AdminComponent,
    children : [
      {path:'', component:UserprofileComponent},
      {path:'map', component:MapComponent},
      {path:'notification', component:NotificationComponent},
      {path:'questionforum', component:QuestionforumComponent},
      {path:'userprofile', component:UserprofileComponent},
      {path:'tablelist', component:TablelistComponent},
      {path:'questionroom', component :QuestionroomComponent},
      {path:'updateuser', component:UpdateUserComponent},
    ]
    },

  {path:'error-message', component:ErrorMessageComponent, children : [ {path:'home', component:HomeComponentComponent}]},
  {path:'questionfeed', component :QuestionfeedComponent},
  {path: 'userlist', component: UserlistComponent},
  {path:'questionform', component:QuestionformComponent},
  {path:'message', component:MessageComponent}



];
@NgModule({
  declarations: [
    AppComponent,
    DemoComponentComponent,

    HighlightDirective,

    HomeComponentComponent,

    AboutComponent,

    ServicesComponent,

    ContactComponent,

    ActivitiesComponent,

    HideElementDirective,

    AdminComponent,

    MapComponent,

    UserprofileComponent,

    NotificationComponent,

    QuestionforumComponent,

    FooterComponent,

    RemoveStylesDirective,

    ErrorMessageComponent,

    TablelistComponent,

    QuestionroomComponent,

    QuestionfeedComponent,

    UserlistComponent,

    QuestionformComponent,

    MessageComponent,

    MainAdminComponent,

    RegisterUserComponent,

    HelplineCenterComponent,

    UpdateUserComponent,

    HighlightQaDirective,

    LogsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    AgmCoreModule.forRoot(
      {
        apiKey: 'AIzaSyCuG1ZyiHTXHeGdTg-N_p8umFWQlikuxHA',
        libraries: ["places"]
      }

    )

  ],
  providers: [AuthService, ChatService,MessagingService,FcmPushService, FirebaseAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
