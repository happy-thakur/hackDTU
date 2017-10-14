import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';


@Injectable()
export class RequestsService {

  constructor(private http: Http, private db: AngularFireDatabase, private firebase: FirebaseApp) { 
    console.log("request service");
   }

  getRequest (url) {
  	return this.http.get(url).map((data: any) => {
  		return data;
  	}).catch((err: any) => {
  		return Observable.throw(err || "Server Error");
  	})
  }

  postRequest(url, data) {
  	return  this.http.post(url, data).map((data) => {
  		return data;
  	}).catch((err: any) => {
  		return Observable.throw(err || "Server Error");
  	});
  }

  pushData(url, data) {
    return this.db.list(url).push(data);
  }

  insertData(url, data) {
    return this.db.list(url).update('/', data);
  }

  deleteData(url) {
    this.db.list(url).remove();
  }

  getTimestamp() {
    return this.db.app['firebase_']['database']['ServerValue']['TIMESTAMP'];
  }

  // all the method to get data...


  	getDataList(str: any, query?:object) {
		if(query) {
			return this.db.list(str, query);
		} else {
			return this.db.list(str);
		}
	}


	getDataObj(url) {
		return this.db.object(url);
	}

	upload(file, name) {
		return this.firebase.storage().ref(name).put(file);
	}

	deleteFile(url: string) {
		return this.firebase.storage().ref(url).delete();
	}
	getURL(url) {
		// console.log(url);
		return this.firebase.storage().ref(url).getDownloadURL();
	}

	getDataByValue(url: string, value: string) {
		return this.getDataList(url, {query: {
			equalTo: value,
			orderByValue: true
		}});
	}

}
