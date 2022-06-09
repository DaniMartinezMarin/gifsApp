import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  get historial(): string[] {
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) { }

  ngOnInit(): void {
  }

  buscar(query: string): void {
    this.gifsService.buscarGifs(query);
  }

}
