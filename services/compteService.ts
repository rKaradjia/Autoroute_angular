

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


test:String;

  
  constructor(private http: Http) {}
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

  seConnecter(login:string,mdp:string){
    console.log('HTTP Service : seConnecter'+login + ' '+mdp);
    

    console.log("TEST DU SERVICE DE CONNEXION");
 
   // console.log( this.http.get('http://localhost:3000/connect/'+login+'/'+mdp).pipe(
     // catchError(this.handleError)));

   /* return this.http.get('http://localhost:3000/connect/'+login+'/'+mdp).pipe(
      catchError(this.handleError));*/
     
   /* console.log("1- Resultat de la route "+this.http.get('http://localhost:3000/connect/'+login+'/'+mdp).subscribe((res:Response) => {
      console.log("1a-"+res.toString());
      
    }));*/
   this.http.get('http://localhost:3000/connect/'+ login+'/'+mdp).pipe(map((response: Response) =>this.test=response.text()));
 
   this.http.get('http://localhost:3000/connect/'+ login+'/'+mdp).subscribe(
         data => {
      console.log("3a -" + data.text());
      this.test = data.text();
      
     //console.log('Variable Test'+ this.test);


     
    });
   
    console.log('Variable Test'+ this.test);
    return this.test;
     
   // console.log(JSON.stringify(this.http.get('http://localhost:3000/connect/${login}/${mdp}').pipe(map((response: Response) =>response.json())))); 
   
    // console.log(JSON.stringify(this.http.get('http://localhost:3000/connect'+login+'/'+mdp)/*.pipe(map((response: Response) =>response.json()))))*/)); 
 //   return this.http.get('http://localhost:3000').pipe(map((response: Response) =>response.json()));
      //return this.http.get('http://localhost:3000/connect/'+ login+'/'+mdp).pipe(map((response: Response) =>response.toString()));

  }


  /*updateCat(cat: compte): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/cats/' + cat.name, cat);
  }*/

  deleteCat(dateTrajet: Date, villeDep: string, villeArrive: string) {  //a voir la recuperation d'un ou plusieurs
    return this.http.delete('http://localhost:8000/trajets/' + name).pipe(map((response: Response) =>response.json()));;
  }
}