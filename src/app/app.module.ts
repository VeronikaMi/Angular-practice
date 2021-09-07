import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipesEffects } from './recipes/store/recipes.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // DropdownDirective, already declared in shared module, cant declare the same thing twice
    // AuthComponent,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    CoreModule,
    // StoreModule.forRoot({shoppingList : SLReducer}), //adding reducers
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    StoreRouterConnectingModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, //service
    // ReactiveFormsModule, do not need it anymore
    // RecipesModule, will load when user visits recipes section
    // SLModule,
    SharedModule,
    // AuthModule
  ],
  bootstrap: [AppComponent],
  // entryComponents:[ //is not needed for older than 9v
  //   AlertComponent //to make it render it manually cuse i dont declare this component anywhere else other than code
  // ]
})
export class AppModule { }
