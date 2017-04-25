import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ContaListPage } from '../pages/conta-list/conta-list';
import { ContaEditPage } from '../pages/conta-edit/conta-edit';
import { CategoriaListPage } from '../pages/categoria-list/categoria-list';
import { CategoriaEditPage } from '../pages/categoria-edit/categoria-edit';
import { FinancasApi } from '../providers/financas-api';
import { DatabaseProvider } from '../providers/database-provider';
import { ContasProvider } from '../providers/contas-provider';
import { CategoriasProvider } from '../providers/categorias-provider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    ContaListPage,
    ContaEditPage,
    CategoriaListPage,
    CategoriaEditPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    ContaListPage,
    ContaEditPage,
    CategoriaListPage,
    CategoriaEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: "pt-BR" },
    FinancasApi,
    DatabaseProvider,
    ContasProvider,
    CategoriasProvider
  ]
})
export class AppModule {}
