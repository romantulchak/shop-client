import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Gpu } from '../model/gpu.model';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-gpu',
  templateUrl: './gpu.component.html',
  styleUrls: ['./gpu.component.css']
})
export class GpuComponent implements OnInit {

  constructor(private productService: ProductService, private notifciationService: NotificationService) { }

  public gpus: Gpu[];
  public gpu: Gpu = new Gpu();
  ngOnInit(): void {
    this.getAllGpus();
  }


  getAllGpus(){
    this.productService.getAllGpus().subscribe(

      res=>{
        console.log(res);
        if(res != null)
          this.gpus = res;
      },
      error=>{
        console.log(error);
      }

    );
  }
  createGpu(){
    this.productService.createGpu(this.gpu).subscribe(

      res=>{
        this.notifciationService.openSnackBar(res);
      },
      error=>{
        console.log(error);
      }

    );
  }

}
