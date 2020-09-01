import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'}) //This is a short way to provide this service into the app.module.ts
export class UserService {
    // activatedEmitter = new EventEmitter<boolean>();

    activatedEmitter = new Subject<boolean>();
}