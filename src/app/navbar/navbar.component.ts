import { Component, OnInit } from '@angular/core';

import { RequestsService } from '../requests.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

adhaar: string = "";
phone: string = "";
mode: string = "";

  constructor(private requestService: RequestsService, private router: Router) { }

  ngOnInit() {

  	if(!localStorage.getItem('loggedIn')) {
        this.router.navigate(['/login']);
  	}

    this.requestService.getDataList('/users/'+localStorage.uid).subscribe((data) => {
      if(!(data == null || data.length == 0)) {
        this.router.navigate(['/home']);
      } 
    });
  }

  doIt(str) {
    console.log(str);
    this.mode = str;
  }

  allDone() {
    console.log(this.mode);
    if(this.mode == 'Delivery man')
  	  localStorage.setItem("mode", 'driver');
    else if(this.mode == 'Customer')
      localStorage.setItem("mode", 'customer');
    else 
      localStorage.setItem("mode", 'both');

  	let x;
  	if(localStorage.getItem("loggedIn")) {
	  	x = {
	  		adhaar: this.adhaar,
	  		phone: this.phone,
	  		mode: this.mode,
	  		name: localStorage.getItem("name"),
	  		email: localStorage.getItem("email")
	  	};
  	}

  	// now post the data..
  	this.requestService.insertData('/user/'+localStorage.getItem("uid"), x).then((data) => {
  		console.log("done");
        this.router.navigate(['/home']);

  		// move to main page..
  	}).catch((err) => console.log(err));
  }


}
