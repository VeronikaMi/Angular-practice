import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipes.model';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from "../../store/app.reducer";
import * as RecipesActions from "../store/recipes.actions";
import * as SLActions from "../../shopping-list/store/shopping-list.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe:Recipe;
  recipe:Recipe;
  id:number;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private store :Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params=>{
        return +params['id'];
      }),
      switchMap(id=>{
        this.id=id;
        return this.store.select('recipes');
      }),
      map(recipesState=>{
        return recipesState.recipes.find((recipe,index)=>{
          return index === this.id;
        })
      })
    ).subscribe(recipe=>{
      this.recipe = recipe;
    })
  }

  addToSL(){
    // this.recipeService.addIngredientsToSL(this.recipe.ingredients);
    this.store.dispatch(new SLActions.AddIngredients(this.recipe.ingredients));
  }

  onEdit(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
