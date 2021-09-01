import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipes.model";

@Injectable()
export class RecipesService{
    recipesChanged = new Subject<Recipe[]>();

    // selectedRecipe = new EventEmitter<Recipe>();
    // selectedRecipe = new Subject<Recipe>(); don't need it anymore


    // private recipes: Recipe[] = [
    //     new Recipe(
    //      'first recipe',
    //      'first desc', 
    //      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
    //      [
    //          new Ingredient('butter',100),
    //          new Ingredient('salt',1)
    //      ]),
    //     new Recipe('second recipe', 
    //     'second desc', 
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
    //     [
    //         new Ingredient('meat',200),
    //         new Ingredient('pepper',2)
    //     ])
    //   ];

    private recipes:Recipe[] = [];

      constructor(private slService:ShoppingListService){}

      setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToSL(ingrs:Ingredient[]){
        this.slService.addIngredients(ingrs);
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());

    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}