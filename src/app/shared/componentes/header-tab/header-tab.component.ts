import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-tab',
  templateUrl: './header-tab.component.html',
  styleUrls: ['./header-tab.component.scss'],
})
export class HeaderTabComponent {
  @Input() titulo: string = 'Tab 1'; 
}
