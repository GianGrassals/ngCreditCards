import { CreditCards } from './../models/CreditCards';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {


  private card$ = new Subject<any>();

  constructor(private firestore: AngularFirestore) { }


  saveCard(card: CreditCards): Promise<any>{
    return this.firestore.collection('cards').add(card);

  }

  getCards(): Observable<any>{
    return this.firestore.collection('cards', ref=>ref.orderBy('createDate','asc')).snapshotChanges();
  }

  deleteCard(id: string): Promise<any>{
    return this.firestore.collection('cards').doc(id).delete();
  }

  editCard(id: string, card: any): Promise<any>{
    return this.firestore.collection('cards').doc(id).update(card);
  }


  addCardEdit(card: CreditCards){
    this.card$.next(card);
  }

  getCardEdit(): Observable<CreditCards>{
    return this.card$.asObservable();
  }

}
