import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Para usar esta librería debemos injectar en el appModule a HttpClientModule

@Injectable(/*{providedIn: 'root'}*/)// {providedIn: 'root'} Permite usar este servicio sin tener que agregarlo de forma manual en el
                                     // appModule. En lo personal me gusta agregarlo
export class DataStorageService {
    constructor(private http: HttpClient) {}
}