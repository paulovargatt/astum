import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { StreamsModule } from './modules/streams.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AuthRoutingModule,
    StreamsRoutingModule,
    StreamsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

