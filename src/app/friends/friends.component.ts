import { Component, OnInit } from '@angular/core';

import { RequestsService } from '../requests.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private requestService: RequestsService) { }

mode: string = "";
source: string = "";
destination: string = "";
width: string = "";
height: string = "";
weight: string = "";
allData: object = {
	customer: [],
	driver: []
};

  ngOnInit() {
  	// fetch all the data..
  	this.mode = localStorage.getItem('mode');
  	console.log(this.mode);
  	if(this.mode == 'customer') {
  		this.requestService.getDataList('/user/'+localStorage.getItem('uid')+'/customer').subscribe((data) => {
  			console.log(data.length);
  			if(data == null || data.length == 0) {
  				this.allData['customer'] = [];
  			} else {
  				this.allData['customer'] = data;
  			}
  	console.log(this.allData);
  			
  		});
  	} else if(this.mode == 'driver') {
  		this.requestService.getDataList('/user/'+localStorage.getItem('uid')+'/driver').subscribe((data) => {
  			console.log(data);

  			if(data == null || data.length == 0) {
  				this.allData['driver'] = [];
  			} else {
  				this.allData['driver'] = data;
  			}
  		});
  	} else if(this.mode == 'both') {
  		this.requestService.getDataList('/user/'+localStorage.getItem('uid')+'/customer').subscribe((data) => {
  			console.log(data);

  			if(data == null || data.length == 0) {
  				this.allData['customer'] = [];
  			} else {
  				this.allData['customer'] = data;
  			}
  		});

  		this.requestService.getDataList('/user/'+localStorage.getItem('uid')+'/driver').subscribe((data) => {
  			console.log(data);

  			if(data == null || data.length == 0) {
  				this.allData['driver'] = [];
  			} else {
  				this.allData['driver'] = data;
  			}
  		});

  	}

  	console.log(this.allData);

  	// get the data from the..
  }


  submitC() {
  	let x = {
  		source: this.source,
  		destination: this.destination,
  		width: this.width,
  		height: this.height,
  		weight: this.weight
  	};

  	this.requestService.pushData('/customer', x).then((data) => {
  		console.log("done");

  		// now enter into user..
  		this.requestService.pushData('/user/'+localStorage.getItem('uid')+'/customer', data.key).then((data) => {
  			console.log("all done");
  		}).catch((err) => console.log(err));

  	}).catch((err) => {
  		console.log(err);
  	});
  }

  submitD() {
  	let x = {
  		source: this.source,
  		destination: this.destination,
  		width: this.width,
  		height: this.height,
  		weight: this.weight
  	};

  	this.requestService.pushData('/Driver', x).then((data) => {
  		console.log("done");

  		// now enter into user..
  		this.requestService.pushData('/user/'+localStorage.getItem('uid')+'/driver', data.key).then((data) => {
  			console.log("all done");
  		}).catch((err) => console.log(err));


  	}).catch((err) => {
  		console.log(err);
  	});

  }
}
