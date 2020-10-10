import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(private dataSotargeService: DataStorageService) {}

    onSaveData() {
        this.dataSotargeService.storeRecipes();
    }

    onFetchData() {
        this.dataSotargeService.fetchRecipes();
    }
}