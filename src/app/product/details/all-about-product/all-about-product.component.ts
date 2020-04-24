import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { Image } from 'src/app/model/image.model';

@Component({
  selector: 'app-all-about-product',
  templateUrl: './all-about-product.component.html',
  styleUrls: ['./all-about-product.component.css']
})
export class AllAboutProductComponent implements OnInit {


  public product: Product;

  public imagePath: string;
  public currentImage: Image;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.product.subscribe(
      product=>{
       if(product != null){
        this.product = product;
        this.imagePath = product.image[0].imagePath;
        this.currentImage = product.image[0];
       }
      }
    );
  }

  changePhoto(img: Image){
    this.currentImage = img;
    this.imagePath = img?.imagePath
  }
}
