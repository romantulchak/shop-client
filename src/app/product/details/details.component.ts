import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.model';
import { error } from 'protractor';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { User } from 'src/app/model/user.model';
import { OpinionProduct } from 'src/app/model/opinionProduct.model';
import { OpinionService } from 'src/app/service/opinion.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {

  private id: number;
  public product:Product;
  public averageRanking:number = 0;


  public visitedProducts: Product[];

  public opinionProduct: OpinionProduct = new OpinionProduct();
  public simularProducts: Product[];

  public opinionCounter: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService, private userService: TokenStorageService, private opinionService: OpinionService, private notificationService: NotificationService) {

      this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));

   }

  ngOnInit(): void {

    this.details();
    this.getVisitedProducts();
    this.opinionService.updateOpinion.subscribe(
      res=>{
        if(res === true){
            this.opinionService.productId.subscribe(
              id=>{
                if(id === this.id){
                  
                  this.opinionService.opinionCounter.subscribe(
                    res=>{
                        this.opinionCounter = res;
                        this.opinionService.updateOpinion.next(false);
                    }
                  );
                }
              }
            );
          }
      }

    );





    this.productService.updateAverageRanking.subscribe(
      res=>{
        if(res === true){
          this.opinionService.productId.subscribe(
            id=>{
              if(this.id === id){
                this.getAverageRanking();
              }
            }
          )
        }
      }
    );
  }

  details(){
    this.productService.detailsProduct(this.id).subscribe(
      res=>{
        console.log('reload');
        this.product = res;
        this.productService.product.next(res);
        this.productService.updateProductAfterReload.next(true);
        this.productService.updateProductFeatures.next(true);
        if(res.opinionProducts.length > 0){
          this.getAverageRanking();
        }
        this.opinionCounter = res.opinionProducts.length;
   
        //this.getOpinionForProduct();
        this.getSimilarProducts(res);
      },
      error=>{console.log(error);}

    );
  }

  getAverageRanking(){
    this.opinionService.getAverageRanking(this.id).subscribe(
      res=>{
        if(res != null){
          this.averageRanking = res;
        }
      }

    );
  }


  getSimilarProducts(res: Product){
    this.productService.getSimilarProducts(this.id, res.category.categoryName).subscribe(
      res=>{
          if(res != null){
            this.simularProducts = res;
          }
      }

    );
  }
 
  getVisitedProducts(){
    if(localStorage.getItem('visited') != null){
      this.visitedProducts = JSON.parse(localStorage.getItem('visited'));
      this.visitedProducts = this.visitedProducts.filter(x=>x.id != this.id);
    }
  }

}
