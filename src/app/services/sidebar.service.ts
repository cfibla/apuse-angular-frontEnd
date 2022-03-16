import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  carregaMenu() {
    
    this.menu = JSON.parse(localStorage.getItem('menu'));

  };

}
