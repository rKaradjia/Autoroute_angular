

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

  //Recuperation des noms des abonnements pour les afficher dans une liste déroulante
  getAllAire():Observable<any>{
    console.log("getAire "+this.identifiant);
    return this.http.get('http://localhost:3000/aire');
  }

  getEtablissementByAire(aire:string):Observable<any>{
    console.log("getAire "+this.identifiant);
    return this.http.get('http://localhost:3000/aire/'+aire);
  }
 


  findIdRestoAire(nomAire:string,nomResto:string,){

    return this.http.get('http://localhost:3000/idRestoAire/'+nomAire+'/'+nomResto);


  }
///reservations/delete/:iduser/:idRestoAire/:dateA/:dateD
  annulerReserv(idrestoAire:number,dateA:string,dateD:string){
   //new Date(datereservString);
    console.log("Compte Service : annuler reserv "+idrestoAire + " " + dateA+ " " + dateD);
  const httpOptions = {
     headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
var idString:string=this.identifiantNum.toString();
var idrestoAireString:string=idrestoAire.toString();
return this.http.delete('http://localhost:3000/reservations/delete/'+this.identifiantNum+'/'+idrestoAire+'/'+dateA+'/'+dateD,httpOptions);
}   // A LA PLACE DE LA REQ

  Reserver(idrestoAire:number,datearrive:Date,datedepart:Date){
   
  

          console.log("Reserver " + this.identifiantNum+" " +idrestoAire + " " + datearrive + " " + datedepart);
          console.log("identifiant restoAire " +idrestoAire);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };

      let httpParams = new HttpParams()
    .append("idnum",this.identifiantNum.toString())  
    .append("idrestoAire",idrestoAire.toString())
    .append("arrive",datearrive.toString())
    .append("depart",datedepart.toString());//Obligation de convertir une reconversation aura lieu dans le serv

    return this.http.post('http://localhost:3000/reservations',httpParams);
  }   // A LA PLACE DE LA REQ

  infoCompte(){

    return this.http.get('http://localhost:3000/compte/'+this.identifiant);
  }

  updateAbonnement(newAbonnement:string){

    let headers = new Headers();
  headers.append('Content-Type', 'application/json');  

    return this.http.put('http://localhost:3000/compte/abonnement/'+this.identifiant+'/'+newAbonnement,headers);
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

    return this.http.post('http://localhost:3000/compte/creation',httpParams);
  }   

  getPassword(oldmdp:string){
      return this.http.get('http://localhost:3000/compte/pwd/'+this.identifiant+'/'+oldmdp);

  }
  

  updatePassword(newmdp:string){

    let headers = new Headers();
  headers.append('Content-Type', 'application/json');  

    return this.http.put('http://localhost:3000/compte/updatepwd/'+this.identifiant+'/'+newmdp,headers);
  }

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