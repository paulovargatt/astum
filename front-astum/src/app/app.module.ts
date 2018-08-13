import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { StreamsModule } from './modules/streams.module';
import {CookieService} from 'ngx-cookie-service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AuthRoutingModule,
    StreamsRoutingModule,
    StreamsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

