import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class FileService {

  constructor(private http: Http) { }

  public getJSON() {
    return this.http.get('/assets/data.json').map((res: any) => res.json());
  }
}
