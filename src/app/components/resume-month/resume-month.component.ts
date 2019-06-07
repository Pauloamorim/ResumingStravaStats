import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'resume-month',
  templateUrl: './resume-month.component.html',
  styleUrls: ['./resume-month.component.less']
})
export class ResumeMonthComponent implements OnInit {

	currentDate = new Date();
	firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
	lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0, 23, 59, 59);

	totalDistance: Number;
	totalDistanceMonth: Number;
	totalDistanceWeek: Number;
	mostCommonDistancesSorted = [];
	bestRunAvgPace;
	mostLongRun;

	constructor(private activityService: ActivityService) { }

	ngOnInit() {
		this.activityService.getActivities().subscribe(data => {
			const result = data as Array<Object>;
			this.getTotalDistance(result);
			this.getWeekStatus(result);
			this.getMonthStatus(result);
			this.getMostCommonDistances(result);
			this.getBestAvgPace(result);
			this.getMostLongRun(result);
		})
	}

	getTotalDistance(data){
		this.totalDistance = Math.round((data.reduce((a, b) => a + b['distance'], 0) / 1000) * 100) / 100;
	}

	getWeekStatus(data) {
		let curr = new Date 
		let week = []

		for (let i = 1; i <= 7; i++) {
			let first = curr.getDate() - curr.getDay() + i 
			let day = new Date(curr.setDate(first))
			week.push(day)
		}

		const activitiesMonth =	data.filter(obj => {
			const objAsDate = new Date(obj['start_date']);
			console.log(week[0])
			return week[0] < objAsDate && objAsDate < week[6];
		})
		console.log(activitiesMonth);
		this.totalDistanceWeek = Math.round((activitiesMonth.reduce((a, b) => a + b['distance'], 0) / 1000) * 100) / 100;
	}

	getMonthStatus(data) {
		const activitiesMonth = data.filter(obj => {
			const objAsDate = new Date(obj['start_date']);
			return this.firstDayOfMonth < objAsDate && objAsDate < this.lastDayOfMonth;
		});

		this.totalDistanceMonth = Math.round((activitiesMonth.reduce((a, b) => a + b['distance'], 0) / 1000) * 100) / 100;
	}

	getMostCommonDistances(data) {
		let mostCommonDistances = {}
		data.forEach(a => {
			const distanceRouded = this.convertToKmAndRoundDistance(a['distance']);
			if(!mostCommonDistances[distanceRouded]){
				mostCommonDistances[distanceRouded] = 1 
			}else{
				mostCommonDistances[distanceRouded] = mostCommonDistances[distanceRouded] + 1
			}
		})

		for (let d in mostCommonDistances) {
			this.mostCommonDistancesSorted.push([d, mostCommonDistances[d]]);
		}
		this.mostCommonDistancesSorted.sort(function(a, b) {
			return b[1] - a[1];
		});	
	}

	getBestAvgPace(data){
		let smallMinute = 59
		let smallSecond = 59;

		data.forEach(obj =>{
			const resultSeconds = Math.round(obj['moving_time'] / (obj['distance']/1000));
			let minutes = Math.floor(resultSeconds / 60) % 60;
			const seconds = resultSeconds % 60;
			if(minutes < smallMinute){
				smallMinute = minutes
				smallSecond = seconds;
				this.bestRunAvgPace = obj;
			}else if(minutes == smallMinute){
				if(seconds < smallSecond){
					smallMinute = minutes
					smallSecond = seconds;
					this.bestRunAvgPace = obj;
				}
			}
		})

		this.bestRunAvgPace.bestPaceTime = `${smallMinute}:${smallSecond}`
	}

	getMostLongRun(data) {
		const distances = data.map(obj => ({
			id: obj['id'],
			distance: obj['distance']
		}));

		distances.sort(function(a, b) {
			return b['distance'] - a['distance'];
		});
		this.mostLongRun = distances[0];
		this.mostLongRun.distance = this.convertToKmAndRoundDistance(distances[0].distance) 
	}

	convertToKmAndRoundDistance(distance) {
		return Math.round((distance / 1000)  * 10) / 10;
	}

}
