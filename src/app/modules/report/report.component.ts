import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {IResponse} from "../auth/auth.models";

@Component({
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  surveyList = [
    {
      question: 'a) ¿Las charlas donde usted participó cumplieron con sus expectativas?.',
      ratingOne: 0,
      ratingTwo: 0,
      ratingThree: 0,
      ratingFour: 0,
      ratingFive: 0
    },
    {
      question: 'b) ¿Los expositores mostraron tener dominio del tema?.',
      ratingOne: 0,
      ratingTwo: 0,
      ratingThree: 0,
      ratingFour: 0,
      ratingFive: 0
    },
    {
      question: 'c) ¿Las instalaciones del evento fueron confortables para usted?.',
      ratingOne: 0,
      ratingTwo: 0,
      ratingThree: 0,
      ratingFour: 0,
      ratingFive: 0
    },
    {
      question: 'd) ¿Tiene algún comentario para los organizadores? (Comentario).',
      comments: 0,
    },
  ];

  responseList: IResponse[];

  initOpts = {
    renderer: 'svg',
    width: 600,
    height: 400
  };

  options = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['a)', 'b)', 'c)', 'd)'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Rating',
      type: 'bar',
      barWidth: '60%',
      data: [0, 0, 0, 0]
    }]
  };

  showChart = false;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.getAllResponses().toPromise().then(res => {
      this.responseList = res;
      this.calculateAnswers();
    });
  }

  calculateAnswers() {
    this.surveyList.forEach((question, i) => {
      if ((i + 1) !== 4) {
        question.ratingOne = this.responseList.filter(r => r.number === (i + 1) && r.rating === '1').length;
        question.ratingTwo = this.responseList.filter(r => r.number === (i + 1) && r.rating === '2').length;
        question.ratingThree = this.responseList.filter(r => r.number === (i + 1) && r.rating === '3').length;
        question.ratingFour = this.responseList.filter(r => r.number === (i + 1) && r.rating === '4').length;
        question.ratingFive = this.responseList.filter(r => r.number === (i + 1) && r.rating === '5').length;
        this.options.series[0].data[i] += question.ratingFive;
      }

      if ((i + 1 === 4)) {
        question.comments = this.responseList.filter(r => r.number === 4 && r.rating.length > 0).length;
        this.options.series[0].data[i] += question.comments;
      }
    });

    this.showChart = true;
  }

}
