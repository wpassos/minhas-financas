import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

	public db: any;
	public dbname: string = 'financas.db';

	constructor(private sqlite: SQLite) { }

	/**
	 * Init - init database etc. PS! Have to wait for Platform.ready
	 */
	initDataBase() {
			this.sqlite.create({ name: this.dbname, location: 'default' })
				.then((db: SQLiteObject) => {
					console.log('Database inited')
					this.db = db;
					this.initTables();
				})
				.catch(e => { console.log(e) });
	}

	initTables() {
		//dev
		this.db.executeSql('DROP TABLE contas');		
		this.db.executeSql('DROP TABLE categorias');
		this.db.executeSql('DROP TABLE movimentos');
		this.db.executeSql('DROP TABLE orcamentos');

		this.db.executeSql('CREATE TABLE IF NOT EXISTS contas( ' +
			'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
			'nome TEXT, ' +
			'tipo TEXT, ' +
			'saldo NUMERIC, ' +
			'somaSubtotais INTEGER)', {})
			.then(() => {console.log('Table contas inited');})
			.catch(e => console.log(e));
		this.db.executeSql('CREATE TABLE IF NOT EXISTS categorias( ' +
			'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
			'nome TEXT, ' +
			'natureza TEXT, ' +
			')', {})
			.then(() => console.log('Table categorias inited'))
			.catch(e => console.log(e));
		this.db.executeSql('CREATE TABLE IF NOT EXISTS movimentos(' +
			'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
			'descricao TEXT, ' +
			'data INTEGER, ' +
			'natureza TEXT, ' +
			'liquidado INTEGER, ' +
			'parcela INTEGER, ' +
			'parcelas INTEGER' +
			'valor NUMERIC, ' +
			'categoria_id INTEGER' +
			'conta_id INTEGER' +
			'orcamento_id INTEGER' +
			')', {})
			.then(() => console.log('Table movimentos inited'))
			.catch(e => console.log(e));
		this.db.executeSql('CREATE TABLE IF NOT EXISTS orcamentos( ' +
			'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
			'ano INTEGER, ' +
			'mes INTEGER, ' +
			'valor NUMERIC, ' +
			'categoria_id INTEGER)', {})
			.then(() => console.log('Table orcamentos inited'))
			.catch(e => console.log(e));
	}

	query(q: string, params?: any): Promise<any> {
		return new Promise((resolve, reject) => {
			params = params || [];
			this.db.transaction((tx) => {
				tx.executeSql(q, params, (tx, res) => {
					resolve(res);
				}, (tx, err) => {
					reject(err);
				});
			});
		});
	}

}