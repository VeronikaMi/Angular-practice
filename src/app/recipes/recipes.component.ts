import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers:[RecipesService] should go to app module to be seen globally , cause it works incorrectly when redirecting somewhere and comming back 
})
export class RecipesComponent implements OnInit {
  selectedRecipe:Recipe;
  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
  }
  

}
