import { CardsService } from './../../services/cards.service';
import { CreditCards } from './../../models/CreditCards';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-cards',
  templateUrl: './create-cards.component.html',
  styleUrls: ['./create-cards.component.scss']
})
export class CreateCardsComponent implements OnInit {
  form: FormGroup;
  loading = false;
  title = "Create Card"
  id: string | undefined;

  constructor( private fb: FormBuilder,
              private cardService: CardsService,
              private toastr: ToastrService) {


    this.form = this.fb.group({
      holder: ['', Validators.required],
      numberCard: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],

    })
   }

  ngOnInit(): void {
    this.cardService.getCardEdit().subscribe(data =>{
      console.log(data);
      this.id = data.id;
      this.title = "Edit Card";
      this.form.patchValue({
        holder: data.holder,
        numberCard: data.numberCard,
        expirationDate: data.expirationDate,
        cvv: data.cvv

      })
    })
  }


  saveCard(){

    if(this.id === undefined){
      // create a new card
      this.createCard();

    } else {
      //edit a new card
      this.editCard(this.id);
    }


  }

  editCard(id: string){
    const Card: any = {
      holder: this.form.value.holder,
      numberCard: this.form.value.numberCard,
      expirationDate: this.form.value.expirationDate,
      cvv: this.form.value.cvv,
      updateDate: new Date(),
    }
    this.loading = true;
    this.cardService.editCard(id, Card).then(()=>{

      this.loading = false;
      this.title = "Add Card";
      this.form.reset();
      this.id = undefined;
      this.toastr.info('The card was updated!', 'Card Updated');

    },error =>{
      console.log(error);
    });

  }


  createCard(){
    const Card: CreditCards = {
      holder: this.form.value.holder,
      numberCard: this.form.value.numberCard,
      expirationDate: this.form.value.expirationDate,
      cvv: this.form.value.cvv,
      createDate: new Date(),
      updateDate: new Date(),
    }

    this.loading = true;
    this.cardService.saveCard(Card).then(()=> {
      this.loading = false;
      console.log("Card Register");
      this.toastr.success('The card was saved successfully!', 'Card saved');
      this.form.reset();
    }, error => {
      this.loading = false;
      this.toastr.error('Opps.. an error ocurred ', 'Error');
      console.log(error);
    })
  }
}
