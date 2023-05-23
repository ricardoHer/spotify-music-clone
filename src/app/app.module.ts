import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInit, ApplicationEffects } from './shared/app-init';
import { environment } from 'src/environments/environment.prod';
import { getApplicationConfigProvider } from './shared/configuration';

import { authInterceptorProvidcer } from './shared/interceptors/auth.interceptor';
import { unauthorizedInterceptorProvider } from './shared/interceptors';
import { NzModalService } from 'ng-zorro-antd/modal';

const rootReducers = {}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot([ApplicationEffects]),
    HttpClientModule,
  ],
  providers: [
    getApplicationConfigProvider(environment),
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store) => () => {
        store.dispatch(AppInit());
      },
      multi: true,
      deps:[Store]
    },
    authInterceptorProvidcer,
    unauthorizedInterceptorProvider,
    NzModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
