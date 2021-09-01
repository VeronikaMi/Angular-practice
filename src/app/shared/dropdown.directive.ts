import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]' //dont forget [], to not use it in html, + use camelCase for directives
})
export class DropdownDirective{
    // @HostBinding('class.open') isOpen:boolean = false;

    // @HostListener('click') toggle(){
    //     this.isOpen = !this.isOpen;
    // }

    //adding functionality so that dropdowns will close if we click anywhere on the page

    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        // console.log(this.elRef.nativeElement.contains(event.target));
        console.log(event.target);
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
}

// directive gets created, catches the element it is attached to 
// when i click on the page , HostListener catches that click and compares it
// to already stored element and acts appropriately
    constructor(private elRef: ElementRef) {
        console.log(elRef)
    }
}