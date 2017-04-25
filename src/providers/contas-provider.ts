import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { DatabaseProvider } from './database-provider';
import { Conta } from '../models/conta';

@Injectable()
export class ContasProvider {

  constructor(private databaseProvider: DatabaseProvider) { }

  listar(): Promise<Conta[]> {
    let contas: Conta[] = [];
    return new Promise((resolve, reject) => {
      this.databaseProvider.query('SELECT * FROM contas')
        .then(result => {
          if (result.rows.length > 0) {
            for (var i = 0; i < result.rows.length; i++) {
              contas.push({
                id: result.rows.item(i).id,
                nome: result.rows.item(i).nome,
                tipo: result.rows.item(i).tipo,
                saldo: result.rows.item(i).saldo,
                somaSubtotais: result.rows.item(i).somaSubtotais
              });
            }
          }
          resolve(contas);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  inserir(conta: Conta): Promise<Conta> {
    return new Promise((resolve, reject) => {
      this.databaseProvider.query(
        "INSERT INTO contas (nome, tipo, saldo, somaSubtotais) VALUES ('" +
        conta.nome + "', '" + conta.tipo + "', " + conta.saldo + ", " + (conta.somaSubtotais? 1 : 0) + ")")
        .then(result => {
          resolve(result as Conta);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  editar(conta: Conta): Promise<Conta> {
    return new Promise((resolve, reject) => {
      this.databaseProvider.query(
        "UPDATE contas SET " +
        "nome = '" + conta.nome + "'," +
        "tipo = '" + conta.tipo + "'," +
        "saldo = " + conta.saldo + "," +
        "somaSubtotais = " + (conta.somaSubtotais? 1 : 0) +
        " WHERE id = " + conta.id)
        .then(result => {
          resolve(result as Conta);
        })
        .catch(err => {
          reject(err);
        })
    });
  }

  excluir(id : number): Promise<Conta> {
    return new Promise((resolve, reject) => {
      this.databaseProvider.query(
        "DELETE FROM contas WHERE id = " + id)
        .then(result => {
          resolve(result as Conta);
        })
        .catch(err => {
          reject(err);
        })
    });
  }
}
