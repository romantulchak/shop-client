import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { NovaPoshtaCity } from '../model/novaPoshtaCity.model';

const API = environment.novaPoshtaAPI;
const API_KEY = environment.novaPoshtaAPIKEY;
@Injectable({
  providedIn:'root'
})
export class NovaPoshtaService{
  constructor(private http: HttpClient){

  }

  getCities():Promise<Response>{
    let obj = {
      modelName: "Address",
      calledMethod: "getCities",
      apiKey: API_KEY
    }
    return fetch(API + 'Address/getCities', {
      body: JSON.stringify(obj),
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
      });

    }
     getNovaPoshtaDepartaments(cityName:string): Promise<Response>{
      let obj = {
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
            CityName:cityName

          },
        apiKey: "0c78648c77fd29457e69d1697c6f4e9c"
        };
      return fetch(API + 'AddressGeneral/getWarehouses', {
        body:JSON.stringify(obj),
        mode:'cors',
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        }
      })
    }
}
