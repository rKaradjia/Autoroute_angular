

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
import { HttpHeaders } from '@angular/common/http';//Pour les requetes post
import {HttpParams} from '@angular/common/http';

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


 //Affiche tous les trajets effetués par un abonné
  getAllTrajets():Observable<any>{
    console.log("getAllTrajets "+this.identifiant);
    return this.http.get('http://localhost:3000/trajets/'+this.identifiant);
  }


  //Affiche tous les trajets effetués par un abonné
  getAllReservations():Observable<any>{
    console.log("getAllTrajets "+this.identifiant);
    return this.http.get('http://localhost:3000/reservations/'+this.identifiant);
  }


  //Recuperation des noms des abonnements pour les afficher dans une liste déroulante
  getNomOfAbonnements():Observable<any>{
    console.log("getNomOfAbonnements "+this.identifiant);
    return this.http.get('http://localhost:3000/abonnements');
  }
 

  createAccount(nom:string,prenom:string,ville:string,cp:number,voie:string,numVoie:number,
    login:string,mdp:string,SelectedAbonnement:string){
   
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };

      let httpParams = new HttpParams()
    .append("nom", nom)
    .append("prenom", prenom)
    .append("ville",ville)
    .append("cp",cp.toString()) //Obligation de convertir une reconversation aura lieu dans le serv
    .append("voie",voie)
    .append("numVoie",numVoie.toString()) //Obligation de convertir une reconversation aura lieu dans le serv   
    .append("login",login)
    .append("mdp",mdp)
    .append("nomAbonnement",SelectedAbonnement);

    return this.http.post('http://localhost:3000/compte/creation'/*+nom+'/'+prenom+'/'+ville+'/'+
      cp+'/'+voie+'/'+numVoie+'/'+login+'/'+mdp+'/'+SelectedAbonnement*/,httpParams/*,httpOptions*/);
  }   // A LA PLACE DE LA REQUETE HTTP CI DESSUS METTRE <form action = "url" dans le formulaire*/

  seConnecter(login:string,mdp:string):Observable<any>{
    //recherche de l'identifiant correspondant aux parametres saisies
    //Set dans une variable avec this
    console.log('HTTP Service : seConnecter'+login + ' '+mdp);
    

    console.log("TEST DU SERVICE DE CONNEXION");
    
    //retourne directement au format JSON car on utilise HTTPCLIENT
    return this.http.get('http://localhost:3000/connect/'+ login+'/'+mdp);
  

  }


  /*updateCat(cat: compte): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/cats/' + cat.name, cat);
  }*/

  deleteCat(dateTrajet: Date, villeDep: string, villeArrive: string) {  //a voir la recuperation d'un ou plusieurs
    return this.http.delete('http://localhost:8000/trajets/' + name).pipe(map((response: Response) =>response.json()));;
  }

/* getTrajet(id: number):Observable<any>{
  //return this.http.post('http://localhost:3000/api/SaveUser/', user).map((response: Response) =>response.json())  //RXJS 5 -
    return this.http.get('http://localhost:3000/trajets/'+ id).pipe(map((response: Response) =>response.json()));  //RXJS 6+
  }*/



  /*GETTERS ET SETTERS : Optionnel*/


  setIdentifiantsCo(login:string,num:number){
        this.identifiant=login;
        this.identifiantNum=num;
        console.log("identifiant enregistrer dans le service " + this.identifiant + " " + this.identifiantNum);

  }

  setIdentifiantsLogout(){
    this.identifiant='';
    this.identifiantNum=0;
    console.log("identifiant reinitialiser dans le service " + this.identifiant + " " + this.identifiantNum);

}

}