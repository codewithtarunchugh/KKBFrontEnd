import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalDataServiceService {
  constructor() {}

  @HostListener('window:unload', ['$event'])
  clearLocalData() {
    // Clear local data here (e.g., localStorage, sessionStorage, cookies, etc.)
    localStorage.clear();
    sessionStorage.clear();
    // You can add more logic here to clear other types of data
  }
}
