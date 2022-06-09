import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent implements OnInit {
  @ViewChild('txtBuscar')
  txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  ngOnInit(): void {}

  buscar(termino: string): void {
    const query = this.txtBuscar.nativeElement.value;

    if (query.trim().length === 0) return;

    this.gifsService.buscarGifs(query);
    this.resetBusqueda();
  }

  resetBusqueda(): void {
    this.txtBuscar.nativeElement.value = '';
  }
}
