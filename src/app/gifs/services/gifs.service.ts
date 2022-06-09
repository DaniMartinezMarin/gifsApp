import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/search-gif-response';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private _servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = 'CtbSNZMFPFlbWl1x5KQjtqPOHnE1ema5';
  private _resultados: Gif[] = [];
  private _historial: string[] = [];

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

    const params = new HttpParams()
            .set('api_key', this._apiKey)
            .set('q', query)
            .set('limit', 10);

    this.ngHttpClient
      .get<SearchGIFResponse>(`${this._servicioUrl}/search`, { params })
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
