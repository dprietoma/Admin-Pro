import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit {
 

  constructor(private settingsService: SettingsService){}


  ngOnInit(): void {
    this.settingsService.checkurrentTheme();
  }


  changueTheme(theme: string ) {

    this.settingsService.changueTheme( theme );

  }

}
