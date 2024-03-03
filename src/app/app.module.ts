import { environment } from './../environments/environment.prod';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './domain/components/tabs/home/home.component';
import { AiComponent } from './domain/components/tabs/ai/ai.component';
import { StatisticsComponent } from './domain/components/tabs/statistics/statistics.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './domain/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreAppModule } from 'src/core/store/store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeReducer } from 'src/core/store/store.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AiComponent,
    StatisticsComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    StoreModule.forRoot({
      nutritionStore: storeReducer,
    }),
    StoreAppModule,
    AppRoutingModule,
    FormsModule,
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
