import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(
        private dataSotargeService: DataStorageService, 
        private authService: AuthService,
        private router: Router
        ) {}
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user//It's the same !user ? false : true;
            console.log(!user);
            console.log(!!user);
        });
    }

    onSaveData() {
        this.dataSotargeService.storeRecipes();
    }
    
    onFetchData() {
        this.dataSotargeService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}