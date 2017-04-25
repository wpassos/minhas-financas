import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Conta } from '../../models/conta';
import { ContasProvider } from '../../providers/contas-provider';

@Component({
  selector: 'page-conta-edit',
  templateUrl: 'conta-edit.html'
})
export class ContaEditPage {

  conta: Conta;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    private contasProvider: ContasProvider) {
    this.conta = navParams.get('conta');
  }

  salvar() {
    if (this.conta.id) {
      this.contasProvider.editar(this.conta)
        .then(resp => {
          this.events.publish('reloadContaListPage');
          this.navCtrl.pop();
        })
        .catch(error => alert("ERROR: " + JSON.stringify(error)));
    } else {
      this.contasProvider.inserir(this.conta)
        .then(resp => {
          this.events.publish('reloadContaListPage');
          this.navCtrl.pop();
        })
        .catch(error => alert("ERROR: " + JSON.stringify(error)));
    }
  }

  excluir() {
    if (confirm('Esta conta será excluída permanentemente. Continuar?')) {
      this.contasProvider.excluir(this.conta.id)
        .then(resp => {
          this.events.publish('reloadContaListPage');
          this.navCtrl.pop();
        })
        .catch(error => alert("ERROR: " + JSON.stringify(error)));
    }

  }

}
