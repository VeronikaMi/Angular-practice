import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('ingredientName')  Name:ElementRef;
  // @ViewChild('ingredientAmount')  Amount:ElementRef;
  // @Output() add = new EventEmitter<Ingredient>();

  @ViewChild('f') form : NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEdtiting.subscribe((index)=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.form.setValue({
        name: this.editedItem.name,
        amount:this.editedItem.amount
      })
    })
  }

  onSubmit(form:NgForm){
    // console.log(a);
    // const iName = this.Name.nativeElement.value;
    // const iAmount = this.Amount.nativeElement.value;
    const values = form.value;
    const ingr = new Ingredient(values.name,values.amount);

    // this.add.emit(ingr);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,ingr);
    }
    else{
      this.slService.addIngredient(ingr);
    }

    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.form.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

 
}
