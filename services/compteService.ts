

/*connexion au serveur nodeJS
import { HttpClient } from '@angular/common/http';//communication avec le serveur nodeJS
//import{ compte } from '../../services/compteService';//represente le contenu de la table dans la base de données
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';//since angular6 ----> before : 'rxjs/Observable'*/

import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions,HttpModule } from '@angular/http';   
import { HttpClient } from '@angular/common/http';   
import { Observable } from 'rxjs';   
import { map } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators'

/*export interface compte {
    id: number;
    familyName: string;
}*/



@Injectable()
export class compteService {

//Variable propres a chaques cas
  /*Compte*/
 identifiant: string; /*ce qui est recuperer*/
 identifiantNum: number; /*retourné convertit en number (Int)*/

  /*Trajets*/


  
  constructor(private http: HttpClient) {

   /* this.identifiant="";
    this.identifiantNum=0;*/

  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }

  getAllTrajets():Observable<any>{
    return this.http.get('http://localhost:3000/trajets').pipe(map((response: Response) =>response.json()));;
  }

  getTrajet(id: number):Observable<any>{
  //return this.http.post('http://localhost:3000/api/SaveUser/', user).map((response: Response) =>response.json())  //RXJS 5 -
    return this.http.get('http://localhost:3000/trajets/'+ id).pipe(map((response: Response) =>response.json()));  //RXJS 6+
  }

  createAccount(){
//  return this.http.post('http://localhost:8000/api/cats/', /*cat*/);
  }   // A LA PLACE DE LA REQUETE HTTP CI DESSUS METTRE <form action = "url" dans le formulaire*/

  seConnecter(login:string,mdp:string):Observable<any>{
    //recherche de l'identifiant correspondant aux parametres saisies
    //Set dans une variable avec this
    console.log('HTTP Service : seConnecter'+login + ' '+mdp);
    

    console.log("TEST DU SERVICE DE CONNEXION");
    
 
    return this.http.get('http://localhost:3000/connect/'+ login+'/'+mdp);
  //  return this.getIdentifiantNum();
  // console.log("getter of idenifiantNum Compte Serv  "+this.getIdentifiantNum());

  }


  /*updateCat(cat: compte): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/cats/' + cat.name, cat);
  }*/

  deleteCat(dateTrajet: Date, villeDep: string, villeArrive: string) {  //a voir la recuperation d'un ou plusieurs
    return this.http.delete('http://localhost:8000/trajets/' + name).pipe(map((response: Response) =>response.json()));;
  }





  /*GETTERS ET SETTERS : Optionnel*/


  getIdentifiantNum(){

    return this.identifiantNum;
  }

  setIdentifiantNum(identifiantNum){
        this.identifiantNum=identifiantNum;
  
  }

}