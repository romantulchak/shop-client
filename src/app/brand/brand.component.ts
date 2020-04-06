import { Component, OnInit } from '@angular/core';
import { Brand } from '../model/brand.models';
import { BrandService } from '../service/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private brandService: BrandService) { }

  public brands: Brand[];
  public brand: Brand = new Brand();
  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(){
    this.brandService.getAllBrands().subscribe(
      res=>{
        if(res != null){
          this.brands = res;
        }
      }
    );
  }

  createBrand(){
    this.brandService.createBrand(this.brand).subscribe(

      res=>{
        this.getAllBrands();
        console.log(res);
      },
      error=>{
        console.error(error);
      }

    );
  }


}
