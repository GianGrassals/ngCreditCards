import { ToastrService } from 'ngx-toastr';
import { CreditCards } from './../../models/CreditCards';
import { CardsService } from './../../services/cards.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.scss']
})
export class ListCardsComponent implements OnInit {

  listCards: CreditCards[] = [];

  constructor(private cardService: CardsService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(){
    this.cardService.getCards().subscribe(doc => {
      this.listCards = [];
      doc.forEach((element: any) => {
        this.listCards.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

  deleteCard(id: any){
    this.cardService.deleteCard(id).then(()=>{
      this.toastr.error('The card was deleted!','Card Deleted')
    }, error =>{
      this.toastr.error('Opps.. an error ocurred ', 'Error');
      console.log(error);
    })
  }

  editCard(card: CreditCards){
    this.cardService.addCardEdit(card);
  }


}
