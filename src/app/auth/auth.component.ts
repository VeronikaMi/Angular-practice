import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

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

  constructor(private authService: AuthService,
     private router: Router,
     private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
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
    let obs:Observable<AuthResponseData>;

    if(this.isLogIn){
      obs=this.authService.login(email, password);
    }
    else{
      obs=this.authService.signUp(email,password);
    }

    obs.subscribe(response=>{
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes'])
    },
    errorMessage=>{
      console.log(errorMessage);
      this.isLoading = false;
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
    });

    authForm.reset();
  }

  onClose(){
    this.error = null;
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
  }

}
