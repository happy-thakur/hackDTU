import { Component, OnInit, NgModule } from '@angular/core';

import { RequestsService } from '../requests.service';

declare var all: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private requestService: RequestsService) { }

  cat = "Category";
  subCat: Array<String> = [];
  question: Object = {
  	ques: "",
  	imgUrl: "",
  	options: {
  		1: "",
  		2: "",
  		3: "",
  		4: ""
  	}
  };
  currentKey = "";
  subCategory = "Sub category";

	temp = {	
	  GK: ['Economy', 'Polity', 'Geography', 'History', 'Science-Tech', 'Environment', 'Misc GK', 'Marketing'],
	  Reasoning: ['Number Series', 'Analogy', 'Odd one out', 'Blood Relations', 'Direction N-S-E-W', 'Coding-Decoding', 'Symbol Change + - X /', 'Standing in Line', 'Dice', 'Finding alphabets in between', 'Syllogism', 'Cubes colored Edges,Faces,Corners', 'Dictionary Order', 'Assumption-Inference-Conclusion', 'Inequalities', 'Meaningful Arrangement', 'Puzzles', 'Handshake'],
	  Quantitative: ['Time-Speed-Distance-Train', 'Boat-River', 'Work-Time', 'HCF-LCM', 'Ratio', 'Percentage', 'Profit-Loss', 'Average', 'Problem on ages', 'Simple-Compound interest', 'Permutation-Combination', 'Geometry', 'Trigonometry', 'Data Interpretation'],
	  English: ['Synonym-Antonym', 'Sentence Correction', 'Direct-Indirect', 'Active-Passive', 'Para-Jumble', 'Idiom-Phrase', 'One word substitution', 'Sentence Completion', 'Spelling-Error-Detection', 'Reading Comprehension']
	};

  answer: object = {
  	ans: "",
  	imgUrl: "",
  	explaination: ""
  }

  loading: boolean = false;

  ngOnInit() {
  	all = this;
  }


  //  getting the sub cat..
  getSubCat() {
  	// console.log(this.cat);
  	if(this.cat != "Category")
  		this.subCat = this.temp[this.cat];
  }


  uploadFile(str, eve) {
  	if(str == "ans") {
  		this.answer['imgUrl'] = eve.target.files[0];
  	} else if(str == "ques") {
  		this.question['imgUrl'] = eve.target.files[0];
  	}
  }

  postData() {
  	// console.log(this.question);
  	// console.log(this.answer);
  	let d = {
  		que: this.question,
  		ans: this.answer,
		category: this.cat,
		by: "Vaibhav Pandey",
  		subCategory: this.subCategory,
  		timestamp: this.requestService.getTimestamp()
  	};


  	// var ans = this.answer['ans'].

  	if(this.answer['ans'].length == 0 || this.answer['explaination'].length == 0 || this.question['ques'].length == 0 || this.question['options']['1'].length == 0 || this.question['options']['2'].length == 0 || this.question['options']['3'].length == 0 || this.question['options']['4'].length == 0 )
  		alert("fill all the feilds");
  	else {
  		if(this.cat !== "Category" && this.subCategory !== "Sub category") {
  			this.loading = true;
  			this.requestService.pushData('/allData/'+this.cat, d)
  			.then((data) => {

				this.currentKey = data.key;
				this.uploadIt().then((data) => {
					if(data == "done") {

						// update data..
		  				alert("success");
		  				this.loading = false
		  				this.cat = "Category";
		  				this.subCategory = "Sub category";
		  				this.subCat = [];
						this.question = {
					  	ques: "",
					  	imgUrl: "",
					  	options: {
					  		1: "",
					  		2: "",
					  		3: "",
					  		4: ""
					  	}
					  };

				  	this.answer= {
					  	ans: "",
					  	imgUrl: "",
					  	explaination: ""
					  }
					}
		  			this.loading = false;
				}).catch((err) => {
		  			this.loading = false;
					alert(err)});

  			})
  			.catch((err) => {
  				this.loading = false;
  				alert(err)});
  		}
  		else
  			alert("Select category & sub category");
  	} 

  }


  uploadIt() {
  	return new Promise((resolve, reject) => {
  		if(this.question['imgUrl'] != "" && this.answer['imgUrl'] != "") {
  			this.requestService.upload(this.question['imgUrl'], this.currentKey+"_question")
  				.then((data) => {
  					// now upload..
  					// console.log(data);
  					// this.question['imgUrl'] = data['downloadURL'];

					this.requestService.insertData('/allData/'+this.cat+'/'+this.currentKey+'/que', {imgUrl: data['downloadURL']})
					.catch((err) => alert(err));

  					this.requestService.upload(this.answer['imgUrl'], this.currentKey+"_answer")
		  				.then((data) => {
		  					// now upload..
  							// this.answer['imgUrl'] = data['downloadURL'];
  							this.requestService.insertData('/allData/'+this.cat+'/'+this.currentKey+'/ans', {imgUrl: data['downloadURL']})
								.catch((err) => alert(err));
		  					resolve("done");
		  				})
		  				.catch((err) => reject(err));
  				})
  				.catch((err) => reject(err));
  		} else if(this.answer['imgUrl'] != "") {
  			this.requestService.upload(this.answer['imgUrl'], this.currentKey+"_answer")
  				.then((data) => {
  					// now upload..
  					// this.answer['imgUrl'] = data['downloadURL'];
  					this.requestService.insertData('/allData/'+this.cat+'/'+this.currentKey+'/ans', {imgUrl: data['downloadURL']})
						.catch((err) => alert(err));
  					resolve("done");
  				})
  				.catch((err) => reject(err));
  		} else if(this.question['imgUrl'] != "") {
  			this.requestService.upload(this.question['imgUrl'], this.currentKey+"_question")
  				.then((data) => {
  					// console.log(data);
  					// this.question['imgUrl'] = data['downloadURL'];
  					this.requestService.insertData('/allData/'+this.cat+'/'+this.currentKey+'/que', {imgUrl: data['downloadURL']})
						.catch((err) => alert(err));
  					resolve("done");
  				})
  				.catch((err) => reject(err));
  		} else {
  			resolve("done");
  		}
  	});	
  }

}
