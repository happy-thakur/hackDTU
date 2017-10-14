import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
	setInterval(function() { this.makeIt(); }, 1000);
  }

  makeIt() {
  	console.log("test it");
  }

	makeTimer() {

		let endTime = new Date("29 April 2018 9:56:00 GMT+01:00");			
		let x = (Date.parse(endTime+"") / 1000);

		var now = new Date();
		let y = (Date.parse(now+"") / 1000);

		let timeLeft = x - y;

		let days = Math.floor(timeLeft / 86400); 
		let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
		let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

		if (hours+"" < "10") { hours = 0; }
		if (minutes+"" < "10") { minutes = 0; }
		if (seconds+"" < "10") { seconds = 0; }

		$("#days").html(days + "<span>Days</span>");
		$("#hours").html(hours + "<span>Hours</span>");
		$("#minutes").html(minutes + "<span>Minutes</span>");
		$("#seconds").html(seconds + "<span>Seconds</span>");		

	}


}
