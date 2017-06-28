import { Component, OnInit } from '@angular/core';
import {FileService} from '../service/file.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  isShown = false;
  data;
  raw;
  back = [];
  lay;
  tableX;
  tableY;

  settings = {
    columns: {
      name: {
        title: 'Team'
      },
      bestBack: {
        title: 'Best Back Odd',
        type: 'html'
      },
      bestLay: {
        title: 'Best Lay Odd',
        type: 'html'
      }
    },
    pager: {
      display: false
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  };

  betfairImage = '/assets/img/betfair.jpg';
  betdaqImage = '/assets/img/betdaq.png';
  smarketsImage = '/assets/img/smarkets.jpg';

  constructor(private fService: FileService) {

    fService.getJSON().subscribe(
      data => {
        this.raw = data;

        const timer = setInterval(() => {
          if (this.raw !== undefined ) {
            this.extractRawData();
            clearInterval(timer);
          }
        }, 50);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

  extractRawData() {

    this.data = _.cloneDeep(this.raw);
    this.raw.forEach((team, index) => {

      const sortedBack = team.back.sort((obj1, obj2) => {
        if (Number(obj1.odd) < Number(obj2.odd)) {
          return 1;
        }
        if (Number(obj1.odd) > Number(obj2.odd)) {
          return -1;
        }
        return 0;
      });

      const sortedLay = team.lay.sort((obj1, obj2) => {
        if (Number(obj1.odd) < Number(obj2.odd)) {
          return -1;
        }
        if (Number(obj1.odd) > Number(obj2.odd)) {
          return 1;
        }
        return 0;
      });

      this.data[index].bestBack = sortedBack[0].odd + ' <br> <img src="' + this.getExchangeLogo(sortedBack[0].name) + '" class="logo" />';
      this.data[index].bestLay = sortedLay[0].odd + ' <br> <img src="' + this.getExchangeLogo(sortedLay[0].name) + '" class="logo" />';

      if (sortedBack[0].odd === '') {
        this.data[index].bestBack = 'n/a';
      }
      if (sortedLay[0].odd === '') {
        this.data[index].bestLay = 'n/a';
      }

    });

  }

  getExchangeLogo(name) {

    switch (name) {
      case 'Betfair':
        return this.betfairImage;
      case 'Betdaq':
        return this.betdaqImage;
      case 'Smarkets':
        return this.smarketsImage;
    }
  }

  onMouseOver(event): void {
    this.back = event.data.back;
    this.lay = event.data.lay;
    this.isShown = true;
  }

  onMouseEnter(event): void {
    this.tableX = event.clientX - 35;
    this.tableY = event.clientY;
  }
  onMouseLeave(event): void {
    this.isShown = false;
  }
}
