import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Items } from 'src/app/models/items';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  items : Items = new Items();
  
  constructor(private productService : ProductsService) { }

  ngOnInit() {
    this.productService.getAllFromTo(0,100).subscribe(res =>{
      this.items = res;
    },
    err=>{
      console.log(err);
    })
  }

  getProductsFromPage(page : number){
    this.productService.getAllFromTo(page-1,100).subscribe(response =>{
      this.items = response;
    },
    err=>console.log(err));
  }

}
