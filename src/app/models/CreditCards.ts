export class CreditCards {
    id?: string;
    holder: string;
    numberCard: string;
    expirationDate: string;
    cvv: number;
    createDate: Date;
    updateDate: Date;


    constructor(holder: string, numberCard: string, expirationDate: string, cvv: number){
      this.holder = holder;
      this.numberCard = numberCard;
      this.expirationDate = expirationDate;
      this.cvv = cvv;
      this.createDate = new Date();
      this.updateDate = new Date();
    }


}
