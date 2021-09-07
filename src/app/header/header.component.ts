import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { AppState } from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipesActions from "../recipes/store/recipes.actions";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated:boolean;
    sub:Subscription;
    constructor(private store:Store<AppState>){}

    ngOnInit(){
        this.sub = this.store.select('auth').pipe(map(userData=>userData.user)).subscribe(user=>{
            this.isAuthenticated = !!user; // <=> user? true : false;
        });
    }

    storeData(){
        // this.dataStorageService.storeRecipes();
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    fetchData(){
        // this.dataStorageService.fetchRecipes().subscribe();
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    onLogout(){
        // this.authService.logout();
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

}