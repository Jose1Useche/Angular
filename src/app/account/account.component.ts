import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogginService } from '../loggin.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [LogginService],
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;
  @Output() statusChanged = new EventEmitter<{id: number, newStatus: string}>();

  constructor(private logginService: LogginService) {}

  onSetTo(status: string) {
    this.statusChanged.emit({id: this.id, newStatus: status});
    this.logginService.logStatusChange(status);
  }
}
