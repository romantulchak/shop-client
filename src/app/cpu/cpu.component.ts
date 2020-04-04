import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Cpu } from '../model/cpu.model';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit {

  constructor(private productService: ProductService, private notificationService: NotificationService) { }

  public cpus: Cpu[];
  public cpu: Cpu = new Cpu();
  ngOnInit(): void {
    this.getAllCpus();
  }

  getAllCpus(){
    this.productService.getAllCpus().subscribe(

      res=>{
        console.log(res);
        if(res != null){
          this.cpus = res;
        }
      },
      error=>{
        console.log(error);
      }


    );
  }
  createCpu(){
    console.log(this.cpu);
    this.productService.createCpu(this.cpu).subscribe(

      res=>{
        this.notificationService.openSnackBar(res);
      },
      error=>{
        console.log(error);
      }

    );
  }
}
