import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
// import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
// import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
// import { map } from 'rxjs/operators';
import { File } from '@ionic-native/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class DicdatabaseService {

  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;  
  // databaseDirectory:any;

  constructor(
    public http:Http, 
    // private sqlitePorter: SQLitePorter, 
    // private storage:Storage,
    private sqlite:SQLite, 
    private platform:Platform,
    public file: File) 
  { 
    this.databaseReady = new BehaviorSubject(false); 
    // if(this.platform.is('ios')){
    //   this.file.documentsDirectory;
    // } else if(this.platform.is('android')){
    //   this.file.externalDataDirectory
    // }    
    this.platform.ready().then(() => {  
      this.sqlite.create({
        name:'DicData.db',
        location: 'default',
      })      
      .then((db:SQLiteObject) => {             
        this.database = db;
        this.getAllWords();
        // this.database.executeSql('SELECT * FROM DicData', [])
        // .then(
        //   res => console.log('Executed SQL')          
        // )
        // .catch(e => console.log(e));               
      })
    });
  }

  // fillDatabase(){    
  //   this.database.executeSql('CREATE TABLE IF NOT EXISTS DicData(id INTEGER PRIMARY KEY)', [])
  //   .then(res => res.console.log(res));
  //   // this.http.get('assets/DicData.sql')
  //   // .pipe(
  //   //   map(res => res.text())
  //   // )
  //   // .subscribe(sql => {
  //   //   this.sqlitePorter.importSqlToDb(this.database,sql)
  //   //   .then(data => {
  //   //     this.databaseReady.next(true);
  //   //     this.storage.set('database_filled',true);
  //   //   })
  //   //   .catch(e=>console.log(e));
  //   // })
  // }

  getAllWords(){    
    // return this.database.executeSql("SELECT * FROM DicData", []).then(data => {
    return this.database.executeSql('SELECT * FROM DicData', []).then(data => {
      let dicData = [];
      if (data.rows.length > 0) {
        for (var i = 0; i<data.rows.length;i++){
          dicData.push({id:data.rows.item(i).id});
          // dicData.push({id:data.rows.item(i).id, word:data.rows.item(i).word,Enmeaning:data.rows.item(i).Enmeaning,Chmeaning:data.rows.item(i).Chmeaning,Kameaning:data.rows.item(i).Kameaning,searchkeyword:data.rows.item(i).searchkeyword,})
        }
      }
      console.log(dicData);
      return dicData;
    }), err => {
      console.log('Error: ', err);
      return [];
    }
  }

  getDatabaseState(){
    return this.databaseReady.asObservable();
  }
}
