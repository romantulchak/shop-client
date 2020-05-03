import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpinionService } from 'src/app/service/opinion.service';
import { OpinionProduct } from 'src/app/model/opinionProduct.model';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { User } from 'src/app/model/user.model';
import { NotificationService } from 'src/app/service/notification.service';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { Opinions } from 'src/app/model/opinions.model';


import {
  RatingChangeEvent
} from 'angular-star-rating/src/interfaces/rating-change-event.interface';
import { Replay } from 'src/app/model/replay.model';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.css']
})
export class OpinionsComponent implements OnInit {

  public opinions: Opinions;
  public isLoggedIn: boolean = false;
  public currentUser: User;
  public product: Product;
  public opinionProduct: OpinionProduct = new OpinionProduct();
  public isFirstLoad: boolean = true;
  public currentOpinion: OpinionProduct;
  public showReplayForm: boolean = false;
  public replays: Replay[];

  public replay: Replay = new Replay();
  public showAnswers: boolean = false;
  onRatingChangeResult: RatingChangeEvent;

  constructor(private router: ActivatedRoute, private productService: ProductService, private opinionService: OpinionService, private userService: TokenStorageService, private notificationService: NotificationService) {
      this.id = Number.parseInt(router.snapshot.parent.paramMap.get('id'));
    
   }


   public totalPages: Array<any>;
   public page:number = 0;


  private id: number;


  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn;
    if(this.isLoggedIn){
      this.currentUser = this.userService.currentUser;
    }
    if(this.isFirstLoad){
    this.getOpinionForProduct();
    this.productService.product.subscribe(
      product=>{
        this.product = product;
      });
    }



    this.opinionService.updateReplayToOption.subscribe(
      res=>{
        if(res === true){
          this.opinionService.replayOpinion.subscribe(
            opinionProductId=>{
              if(opinionProductId != null){
                this.getReplays(opinionProductId);
              } 
            }
          );
        }
      }
    );





    this.productService.updateProductAfterReload.subscribe(
      res=>{
        if(res === true){
          this.productService.product.subscribe(
            product=>{
              this.product = product;
              
              this.getOpinionForProduct();
              //TODO: якщо сокети не працюють
              //this.productService.updateProductAfterReload.next(false);
            }
          );
        }
      }
    );
    this.opinionService.updateOpinion.subscribe(
      res=>{
        
        if(res === true){
          this.opinionService.productId.subscribe(
            id=>{
        
              if(id === this.id){
                this.getOpinionForProduct();
                this.opinionService.updateOpinion.next(false);
              }
            }
          );
        }
      }
    );
  }
  getOpinionForProduct(){
      this.opinionService.getOpinionForProduct(this.id, this.page, this.currentUser).subscribe(
        res=>{
          if(res != null){
            this.opinions = res;
            console.log(res);
             this.totalPages = new Array(res.totalPages);
             this.opinionService.opinionCounter.next(res.commentsCounter);
             this.productService.updateProductAfterReload.next(false);
             this.isFirstLoad = false;
          }
        }
      );
  }


  setOpinion(text: string, advantages: string, disadvantages:string ){
    
    this.opinionProduct = {
      text: text,
      rating:this.onRatingChangeResult.rating,
      commentToProduct: this.product,
      advantages: advantages,
      disadvantages: disadvantages
    };

    this.opinionService.createOpinion(this.opinionProduct, this.currentUser.id).subscribe(

        res=>{
          if(res != null){
            this.getOpinionForProduct();
            this.notificationService.success(res);
          }
        }
    );
  }

  setPage(page: number, $event){
    event.preventDefault();
    this.page = page;
    this.getOpinionForProduct();
  }
  onRatingChange = ($event: RatingChangeEvent) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
  };

  setLike(opinionProduct: OpinionProduct){
     this.opinionService.setLike(this.currentUser, opinionProduct).subscribe(
       res=>{
         this.getOpinionForProduct();
         this.notificationService.success(res);
       }
     );
  }
  setDislike(opinionProduct: OpinionProduct){
    this.opinionService.setDislike(this.currentUser, opinionProduct).subscribe(
      res=>{
        this.getOpinionForProduct();
        this.notificationService.success(res);
      }
    );
  }


    getReplays(opinionProductId: number){
      this.opinionService.getAnswersForReplays(opinionProductId).subscribe(
        res=>{
          if(res != null){
            this.replays = res;
          }
        }
      );
    }


  getPercent(likes: number, dislikes: number): number{

    return ((likes * 100) / ((likes + dislikes ) * 100))*100;
  }

  setReplay(opinion: OpinionProduct){
    this.currentOpinion = opinion;
    this.showReplayForm = !this.showReplayForm;
  }

  showReplays(opinion: OpinionProduct){
    this.currentOpinion = opinion;
    this.showAnswers = !this.showAnswers;
    this.getReplays(opinion.id);

  }

  setAnswer(opinionProduct: OpinionProduct){
    
    
    this.opinionService.setAnswer(this.replay, opinionProduct, this.currentUser.id).subscribe(
      res=>{
        this.getReplays(opinionProduct.id)
        this.notificationService.success(res);
      }
    );
  }
}
