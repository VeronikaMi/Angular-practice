import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipes.model";
import { RecipesService } from "./recipes.service";

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private daraStorage:DataStorageService, private recipeService : RecipesService){}

    resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipes();

        // console.log("resolver works!")
        if(recipes.length === 0 ){
            console.log("resolver works!")
            return this.daraStorage.fetchRecipes();

        }
        else{
            console.log("resolver works!")
            return recipes;

        }
    }

}