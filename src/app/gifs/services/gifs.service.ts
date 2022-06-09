import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/search-gif-response';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private _apiKey: string = 'CtbSNZMFPFlbWl1x5KQjtqPOHnE1ema5';
  private _resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  get resultados() : Gif[] {
    return [...this._resultados];
  }

  constructor(private ngHttpClient: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this._resultados = JSON.parse(localStorage.getItem('ultimosResultados')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.ngHttpClient
      .get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe(
        (response: SearchGIFResponse) => {
          this._resultados = response.data;
          localStorage.setItem('ultimosResultados', JSON.stringify(this._resultados));
        },
        (error) => {
          console.error('Se ha producido un error en la petición: ', error);
        }
      );
  }
}
