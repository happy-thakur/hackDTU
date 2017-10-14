import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

practice: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  startPractice(str) {
  	console.log(str);
  	this.practice = true
  }

}
	