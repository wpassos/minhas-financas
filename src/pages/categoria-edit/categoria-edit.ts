import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Categoria } from '../../models/categoria';
import { CategoriasProvider } from '../../providers/categorias-provider';

@Component({
  selector: 'page-categoria-edit',
  templateUrl: 'categoria-edit.html'
})
export class CategoriaEditPage {

  categoria: Categoria;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
    private categoriasProvider: CategoriasProvider) {
    this.categoria = navParams.get('categoria');
  }

  salvar() {
    if (this.categoria.id) {
      this.categoriasProvider.editar(this.categoria)
        .then(resp => {
          this.events.publish('reloadCategoriaListPage');
          this.navCtrl.pop();
        })
        .catch(error => alert("ERROR: " + JSON.stringify(error)));
    } else {
      this.categoriasProvider.inserir(this.categoria)
        .then(resp => {
          this.events.publish('reloadCategoriaListPage');
          this.navCtrl.pop();
        })
        .catch(error => alert("ERROR: " + JSON.stringify(error)));
    }
  }

  excluir() {
    if (confirm('Esta categoria será excluída permanentemente. Continuar?')) {
      this.categoriasProvider.excluir(this.categoria.id)
        .then(resp => {
          this.events.publish('reloadCategoriaListPage');
          this.navCtrl.pop();
        })
        .catch(error => alert("ERROR: " + JSON.stringify(error)));
    }

  }

}
