import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/Commande';
import { AuthService } from '../../services/auth.service';

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripe: typeof Stripe | null = null;
  elements: any;
  cardElement: any;
  cardError: string = '';
  clientSecret: string = '';
  isProcessing: boolean = false;
  isPaymentSuccess: boolean = false;
  items = [
    { name: 'Article 1', price: 2500, quantity: 1 },
    { name: 'Article 2', price: 3000, quantity: 2 },
  ];
  totalAmount: number = 0;
  commandes: Commande[] = [];
  id:Commande['id']
  roles:any
  constructor(private paymentService: PaymentService,private commande:CommandeService,private auth:AuthService) {}

  ngOnInit(): void {
    this.stripe = Stripe('pk_test_51QK3hCAm4UUsuNYuOFHy1GL1zng6nUrBZi6g2BY3TBvAatxnJ6HbcqOHQcng34zFchcArREhmlNkEDp0TNSEfiei00zGxxZmp5');
    this.elements = this.stripe.elements();
    this.setupStripeElements();
    this.calculateTotal();
    this.getCurrentUser()
  }

  setupStripeElements(): void {
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
        '::placeholder': { color: '#a0aec0' }
      },
      invalid: { color: '#fa755a' }
    };

    this.cardElement = this.elements.create('card', { style });
    this.cardElement.mount('#card-element');

    this.cardElement.on('change', (event: any) => {
      this.cardError = event.error ? event.error.message : '';
    });
  }
  getCurrentUser(){
    this.roles=this.auth.getRoles();
  console.log(this.roles);
  this.auth.getCurrentUser().subscribe({
    next:(data)=>{
      console.log(data);
      this.id=data.id
      this.getCommandeByuser(this.id)
      console.log(this.id);
      
    },
    error: (error) => {
      console.error( error);
    }

  })

  }
  
  calculateTotal() {
    this.totalAmount = 0; 
    for (let commande of this.commandes) {
      this.totalAmount += commande.menuPrice || 0; 
    }
  }
  getCommandeByuser(id:any){
    this.commande.getbyidClient(id).subscribe({
      next:(data)=>{
        this.commandes=data
        this.calculateTotal()
        console.log(this.commandes);
  
     

      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

 initiatePayment(): void {
  this.isProcessing = true;
  this.cardError = '';

  this.paymentService.createPaymentIntent(this.totalAmount).subscribe(
    (response) => {
      this.clientSecret = response.clientSecret;

      if (!this.clientSecret) {
        this.cardError = 'Le client secret est invalide.';
        this.isProcessing = false;
        return;
      }

      this.stripe?.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.cardElement,
          billing_details: { name: 'Client' }
        }
      }).then(({ error, paymentIntent }: { error: any, paymentIntent: any }) => {
        if (error) {
          this.cardError = error.message;
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          this.isPaymentSuccess = true;

          Swal.fire({
            icon: 'success',
            title: 'Paiement réussi !',
            text: 'Voulez-vous continuer vos achats ?',
            showCancelButton: true,
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
          }).then((result) => {
            if (result.isConfirmed) {
              console.log('L\'utilisateur souhaite continuer ses achats.');
            } else {
              console.log('L\'utilisateur ne souhaite pas continuer.');
            }
          });
        }
      }).catch((err: any) => {
        this.cardError = 'Une erreur est survenue lors de la confirmation du paiement.';
      });
    },
    (err) => {
      this.cardError = 'Erreur lors de la création du PaymentIntent.';
      this.isProcessing = false;
    },
    () => {
      this.isProcessing = false;
    }
  );
}

}
