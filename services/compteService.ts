
//connexion au serveur nodeJS
import { HttpClient } from '@angular/common/http';//communication avec le serveur nodeJS
//import{ compte } from '../../services/compteService';//represente le contenu de la table dans la base de données
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';//since angular6 ----> before : 'rxjs/Observable'

export interface compte {
    id: number;
    familyName: string;
}
@Injectable()
export class compteService {
  constructor(private http: HttpClient) {}

  getAllTrajets(): Observable<compte[]> {
    return this.http.get<compte[]>('http://localhost:3000/trajets');
  }

  getTrajet(id: number): Observable<compte> {
    return this.http.get<compte>('http://localhost:8000/trajets/' + id);
  }

  /*createAccount(cat: compte): Observable<compte> {
    return this.http.post<compte>('http://localhost:8000/api/cats/', cat);
  }    A LA PLACE DE LA REQUETE HTTP CI DESSUS METTRE <form action = "url" dans le formulaire*/

  /*updateCat(cat: compte): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/cats/' + cat.name, cat);
  }*/

  deleteCat(dateTrajet: Date, villeDep: string, villeArrive: string) {  //a voir la recuperation d'un ou plusieurs
    return this.http.delete('http://localhost:8000/trajets/' + name);
  }
}