import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/search-gif-response';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = 'CtbSNZMFPFlbWl1x5KQjtqPOHnE1ema5';

  resultados: Gif[] = [];

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
      .get<SearchGIFResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe(
        (response: SearchGIFResponse) => {
          this.resultados = response.data;
        },
        (error) => {
          console.error('Se ha producido un error en la petición: ', error);
        }
      );
  }
}
