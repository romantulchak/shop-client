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
  public isLoggedIn: boolean = false;
  public currentUser: User;
  public ranking: number = 5;
  public averageRanking:number;
  public opinionProduct: OpinionProduct = new OpinionProduct();
  public opinions: OpinionProduct[];

  public simularProducts: Product[];


  constructor(private route: ActivatedRoute, private productService: ProductService, private userService: TokenStorageService, private opinionService: OpinionService, private notificationService: NotificationService) {

      this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));

   }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn;
    if(this.isLoggedIn){
      this.currentUser = this.userService.currentUser;
    }
    this.details();
    


    this.opinionService.updateOpinion.subscribe(
      res=>{
        if(res === true){
          this.opinionService.productId.subscribe(
            id=>{

              if(id === this.id){
                this.getOpinionForProduct();
              }
            }

          );
        }
      }

    );

  }

  details(){
    this.productService.detailsProduct(this.id).subscribe(
      res=>{
        
        this.product = res;
        this.getOpinionForProduct();
        this.getSimilarProducts(res);
      },
      error=>{console.log(error);}

    );
  }
  setOpinion(text: string ){
    this.opinionProduct = {
      id: null,
      text: text,
      rating:this.ranking,
      commentToProduct: this.product,
      user: null
    };

    this.opinionService.createOpinion(this.opinionProduct, this.currentUser.id).subscribe(

        res=>{
          if(res != null){
            this.details();
            this.notificationService.openSnackBar(res);
          }
        }


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
  getOpinionForProduct(){
    this.opinionService.getOpinionForProduct(this.id).subscribe(
      res=>{
        if(res != null){
          this.opinions = res;
            if(res.length != 0){
              this.getAverageRanking();
            }
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
}
