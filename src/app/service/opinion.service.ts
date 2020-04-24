import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OpinionProduct } from '../model/opinionProduct.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Opinions } from '../model/opinions.model';


const API_URL = environment.apiUrl;
@Injectable({
    providedIn: 'root'
})

export class OpinionService{

    public updateOpinion: BehaviorSubject<boolean>;
    public productId: BehaviorSubject<number>;
    public opinionCounter: BehaviorSubject<number>;
    public updateOpinionCounter: BehaviorSubject<boolean>;
    constructor(private http: HttpClient){
        this.updateOpinion = new BehaviorSubject<boolean>(false);
        this.productId = new BehaviorSubject<number>(null);
        this.opinionCounter = new BehaviorSubject<number>(0);
    }

    createOpinion(opinionProducts: OpinionProduct, userId: number){
        return this.http.post(API_URL + 'opinion/createOpinion/' + userId, opinionProducts, {responseType:'text'});
    }
    getAverageRanking(productId: number): Observable<number>{
        return this.http.get<number>(API_URL + 'opinion/getAverageRanking/' + productId);
    }
    getOpinionForProduct(productId: number, page: number): Observable<Opinions>{
        let paramsToSend = new HttpParams();
        paramsToSend = paramsToSend.append('page', page.toString());
        return this.http.get<Opinions>(API_URL + 'opinion/getOpinionForProduct/' + productId, {params: paramsToSend});
    }

}