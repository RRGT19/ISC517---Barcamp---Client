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
      question: '¿Las charlas donde usted participó cumplieron con sus expectativas?.',
      ratingOne: 0,
      ratingTwo: 0,
      ratingThree: 0,
      ratingFour: 0,
      ratingFive: 0
    },
    {
      question: '¿Los expositores mostraron tener dominio del tema?.',
      ratingOne: 0,
      ratingTwo: 0,
      ratingThree: 0,
      ratingFour: 0,
      ratingFive: 0
    },
    {
      question: '¿Las instalaciones del evento fueron confortables para usted?.',
      ratingOne: 0,
      ratingTwo: 0,
      ratingThree: 0,
      ratingFour: 0,
      ratingFive: 0
    },
    {
      question: '¿Tiene algún comentario para los organizadores? (Comentario).',
      comments: 0,
    },
  ];

  responseList: IResponse[];

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
      }

      if ((i + 1 === 4)) {
        question.comments = this.responseList.filter(r => r.number === 4 && r.rating.length > 0).length;
      }
    });
  }

}
