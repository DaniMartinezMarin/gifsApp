import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = 'CtbSNZMFPFlbWl1x5KQjtqPOHnE1ema5';

  resultados: any [] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private ngHttpClient: HttpClient) {}

  buscarGifs(query: string = '') {
    query = query.toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }

    this.ngHttpClient
      .get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((response: any) => {
        console.log(response.data);
        this.resultados = response.data;
      });
  }
}
