import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { DatabaseProvider } from './database-provider';
import { Categoria } from '../models/categoria';

@Injectable()
export class CategoriasProvider {

  constructor(private databaseProvider: DatabaseProvider) {
  }

  listar(): Promise<Categoria[]> {
    let categorias: Categoria[] = [];
    return new Promise((resolve, reject) => {
      this.databaseProvider.query('SELECT * FROM categorias')
        .then(result => {
          if (result.rows.length > 0) {
            for (var i = 0; i < result.rows.length; i++) {
              categorias.push({
                id: result.rows.item(i).id,
                nome: result.rows.item(i).nome
              });
            }
          }
          resolve(categorias);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  inserir(categoria: Categoria): Promise<Categoria> {
    return new Promise((resolve, reject) => {
      this.databaseProvider.query(
        "INSERT INTO categorias (nome) VALUES ('" + categoria.nome + "')")
        .then(result => {
          resolve(result as Categoria);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  editar(categoria: Categoria): Promise<Categoria> {
    return new Promise((resolve, reject) => {
      this.databaseProvider.query(
        "UPDATE categorias SET nome = '" + categoria.nome + "'" +
        " WHERE id = " + categoria.id)
        .then(result => {
          resolve(result as Categoria);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  excluir(id : number): Promise<Categoria> {
    return new Promise((resolve, reject) => {
      this.databaseProvider.query(
        "DELETE FROM categorias WHERE id = " + id)
        .then(result => {
          resolve(result as Categoria);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

}
