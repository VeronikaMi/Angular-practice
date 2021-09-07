import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogIn = true;
  isLoading = false;
  error :string;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  subscription: Subscription;
  subscription1: Subscription;


  constructor(private authService: AuthService,
     private router: Router,
     private componentFactoryResolver: ComponentFactoryResolver,
     private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription1 = this.store.select('auth').subscribe(authState=>{
      this.error = authState.authError;
      this.isLoading = authState.loading;
      if(this.error){
        this.showErrorAlert(this.error);
      }
    })
  }

  onSwitchMode(){
    this.isLogIn = !this.isLogIn;
  }

  onSubmit(authForm: NgForm){
    if(!authForm.valid){
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    this.isLoading = true;

    // to clean up code cause subscription goes the same way for login and sign up
    // let obs:Observable<AuthResponseData>;

    if(this.isLogIn){
      // obs=this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email:email,password:password}));
    }
    else{
      // obs=this.authService.signUp(email,password);
      this.store.dispatch(new AuthActions.SignupStart({email:email,password:password}));
    }

    

    // obs.subscribe(response=>{
    //   console.log(response);
    //   this.isLoading = false;
    //   this.router.navigate(['/recipes'])
    // },
    // errorMessage=>{
    //   console.log(errorMessage);
    //   this.isLoading = false;
    //   this.error = errorMessage;
    //   this.showErrorAlert(errorMessage);
    // });

    authForm.reset();
  }

  onClose(){
    this.store.dispatch(new AuthActions.ClearError());
  }

  showErrorAlert(message:string){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    // get access to the place 
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // get rid of everything thst was in there before
    hostViewContainerRef.clear();
    // create component
    const componentRef = hostViewContainerRef.createComponent(componentFactory);

    componentRef.instance.message = message;
    this.subscription = componentRef.instance.close.subscribe(()=>{
      this.subscription.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    if(this.subscription1){
      this.subscription1.unsubscribe();
    }  }

}
