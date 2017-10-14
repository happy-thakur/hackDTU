import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';

import { AuthService } from '../auth.service';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private requestService: RequestsService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  	// ge the data..
  	console.log("all data");
  	// this.requestService.getRequest("http://localhost:3000/getData/2").subscribe((data) => {
  	// 	console.log(data);
  	// 	if(data['status'] == 200) {
  	// 		let temp = JSON.parse(data['_body'])['data'];
  	// 		console.log(temp);
  	// 		for(var i in temp) {
  	// 			let r = temp[i].pop();
  	// 			if(r) {
  	// 				this.postData(temp[i], r);
  	// 			}
  	// 		}
  	// 		console.log(JSON.parse(data['_body'])['data']);
  	// 		if(JSON.parse(data['_body'])['data'].length > 0)
  	// 			this.postData(JSON.parse(data['_body'])['data'], JSON.parse(data['_body'])['data'].pop());
  	// 	}
  	// });
  }


  // login using google..
  login() {
  	    this.authService.login(0).then((result) => {
  	    	// means logged in..
  	    	// move to dashboared..

            localStorage.loggedIn = true;
	        localStorage.name = result.user.providerData[0].displayName;
		    localStorage.email = result.user.providerData[0].email;
		    // localStorage.photoURL = result.user.providerData[0].photoURL;
		    localStorage.uid = result.user.uid;

        // check if first then enter more details..
        this.requestService.getDataList('/users/'+localStorage.uid).subscribe((data) => {
          if(data == null || data.length == 0) {
            // first
            this.router.navigate(['/afterSignup']);

          } else {
            // second..
            this.router.navigate(['/home']);

          }
        });

  	    }).catch((err) => {console.log(err)});
  }


  // postData(info, data) {
  // 	data['timestamp'] = this.requestService.getTimestamp();
  // 		console.log(data);
  // 	this.requestService.pushData("/allData/Quantitative", data).then((data) => {
  // 		let x = info.pop()
  // 		if(x)
  // 			this.postData(info, x);
  // 	});
  // }
}
