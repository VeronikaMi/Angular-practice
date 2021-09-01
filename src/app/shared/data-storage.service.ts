import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipes.model";
import { RecipesService } from "../recipes/recipes.service";
import {exhaustMap, map, take, tap} from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient,
         private recipesService: RecipesService,
         private authService:AuthService){}

    storeRecipes(){
        const recipes = this. recipesService.getRecipes();
        this.http.put('https://angular-db-75200-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(response=>{
            console.log(response);
        })
    }

    fetchRecipes(){
        
        // to not get this service dirty and repeat the same action for more than one time
        // made an interceptor that will intercept wuth every request sent 


        // return this.authService.user.pipe(take(1), exhaustMap(user=>{
        //     return this.http.get<Recipe[]>('https://angular-db-75200-default-rtdb.firebaseio.com/recipes.json',
        //     {
        //         params: new HttpParams().set('auth', user.token)
        //     })
        // }),
        // map(recipes =>{
        //     return recipes.map(recipe=>{
        //         return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}; //if does not have ingredients sets it to an empty array so that every recipe has ingredients
        //     })
        // }),tap(recipes=>{
        //    this.recipesService.setRecipes(recipes);
        // })
        // )

        // should specify the type of recipe[] cause it gives an error when setting , thinking it snt the necesary type.
         return this.http.get<Recipe[]>('https://angular-db-75200-default-rtdb.firebaseio.com/recipes.json')
         .pipe(map(recipes =>{
             return recipes.map(recipe=>{
                 return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}; //if does not have ingredients sets it to an empty array so that every recipe has ingredients
             })
         }),tap(recipes=>{
            this.recipesService.setRecipes(recipes);
         }));
         
    }
}