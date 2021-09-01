import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

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
