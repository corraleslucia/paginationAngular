import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  
  @Input()
  quantity : number;
  pagesQuantity : number;
  pages : Array<number> = new Array();

  @Output()
  selectedPageEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
   
  }

  ngOnChanges(){
    this.pagesQuantity = Math.ceil(this.quantity/100);
    for (let index = 0; index < this.pagesQuantity; index++) {
      this.pages.push(index+1);
    }
  }

  selectPage(page : number){
    this.selectedPageEvent.emit(page);
  }

}
