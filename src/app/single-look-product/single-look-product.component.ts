import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-single-look-product',
  templateUrl: './single-look-product.component.html',
  styleUrls: ['./single-look-product.component.css']
})
export class SingleLookProductComponent implements OnInit {
  @Input() product: Product;
  @Input() singleLook: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
