import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Conta } from '../../models/conta';
import { ContaEditPage } from '../../pages/conta-edit/conta-edit';
import { ContasProvider } from '../../providers/contas-provider';

@Component({
  selector: 'page-conta-list',
  templateUrl: 'conta-list.html'
})
export class ContaListPage implements OnInit {
  contas: Conta[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contasProvider: ContasProvider, public events: Events) {
    this.events.subscribe('reloadContaListPage', () => {
      this.list();
    });
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.contasProvider.listar()
      .then(contas => {
        this.contas = contas;
      })
      .catch(err => alert(err))
  }

  contaTapped(event, conta) {
    this.navCtrl.push(ContaEditPage, {
      conta: conta
    });
  }

  newContaTapped() {
    this.navCtrl.push(ContaEditPage, {
      conta: { id: null, nome: '', tipo: 'Dinheiro', saldo: 0, somaSubtotais: true } as Conta
    });
  }

}
