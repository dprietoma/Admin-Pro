import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems: any[];
  constructor(private sidebarService: SidebarService, private usarioServices: UsuarioService) {
    this.menuItems = sidebarService.menu;
  }

  logout(){
    this.usarioServices.logout();
  }
}
