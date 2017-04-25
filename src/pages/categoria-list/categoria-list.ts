import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Categoria } from '../../models/categoria';
import { CategoriaEditPage } from '../../pages/categoria-edit/categoria-edit';
import { CategoriasProvider } from '../../providers/categorias-provider';

@Component({
  selector: 'page-categoria-list',
  templateUrl: 'categoria-list.html'
})
export class CategoriaListPage {
categorias: Categoria[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private categoriasProvider: CategoriasProvider, public events: Events) {
    this.events.subscribe('reloadCategoriaListPage', () => {
      this.list();
    });
  }

  ngOnInit() {
    this.list();
  }

  list() {
    this.categoriasProvider.listar()
      .then(categorias => {
        this.categorias = categorias;
      })
      .catch(err => alert(err))
  }

  categoriaTapped(event, categoria) {
    this.navCtrl.push(CategoriaEditPage, {
      categoria: categoria
    });
  }

  newCategoriaTapped() {
    this.navCtrl.push(CategoriaEditPage, {
      categoria: { id: null, nome: ''} as Categoria
    });
  }

}
