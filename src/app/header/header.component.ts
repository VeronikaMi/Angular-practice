import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated:boolean;
    sub:Subscription;
    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService){}

    ngOnInit(){
        this.sub = this.authService.user.subscribe(user=>{
            this.isAuthenticated = !!user; // <=> user? true : false;
        });
    }

    storeData(){
        this.dataStorageService.storeRecipes();
    }

    fetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

}