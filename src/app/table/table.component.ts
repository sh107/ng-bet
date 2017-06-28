import { Component, OnInit } from '@angular/core';
import {FileService} from '../service/file.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  isShown = false;
  data;
  raw;
  back;
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

    this.data = this.raw;
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

      this.data[index].bestBack = sortedBack[0].odd + ' ' + sortedBack[0].name;
      this.data[index].bestLay = sortedLay[0].odd + ' ' + sortedLay[0].name;
    });

  }

  onMouseOver(event): void {

    this.back = event.data.back;
    this.lay = event.data.lay;
  }

  onMouseEnter(event): void {
    this.isShown = true;
    this.tableX = event.clientX;
    this.tableY = event.clientY;
  }
  onMouseLeave(event): void {
    this.isShown = false;
  }
}
