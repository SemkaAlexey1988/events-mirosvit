import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CurrencyService } from '../../../common/services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currentCurrency;
  loadCurrency:boolean;

  constructor(private CurrencyService:CurrencyService) { }


currencySelected: any;
сurrencyName: string;
сurrencyValue: string;

  ngOnInit() {

    this.loadCurrency = false;   

    this.CurrencyService
    .getCurrency()
    .subscribe((currentCurrency) => {
    this.currentCurrency = currentCurrency;
    this.loadCurrency = true;
    });


    


  }

 

}
