import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEdtiting = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('apples',2),
        new Ingredient('bananas',4),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingr:Ingredient){
        this.ingredients.push(ingr);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingrs:Ingredient[]){
        this.ingredients.push(...ingrs);
        this.ingredientsChanged.next(this.ingredients.slice());

    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    updateIngredient(index:number, ingredient:Ingredient){
       this.ingredients[index] = ingredient;
       this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}