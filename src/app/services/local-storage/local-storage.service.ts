import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public remove(key: string): void {
    if (localStorage.getItem(key) != null) {
      localStorage.removeItem(key);
    }

    if (localStorage.getItem(`${key}_expiry`) != null) {
      localStorage.removeItem(`${key}_expiry`);
    }
  }

  public get(key: string): string | null {
    if (localStorage.getItem(key) != null) {
      return localStorage.getItem(key);
    }
    return null;
  }

  public set(key: string, value: string, expirySeconds?: number): void {
    localStorage.setItem(key, value);

    if (expirySeconds != undefined && expirySeconds != null) {
      const expiry: number = Date.now() + Math.abs(expirySeconds) * 1000;
      localStorage.setItem(`${key}_expiry`, expiry.toString());
    }
  }

  public isExpired(key: string): boolean {
    if (localStorage.getItem(`${key}_expiry`) != null) {
      return Date.now() > parseInt(<string>localStorage.getItem(`${key}_expiry`));
    }
    return true;
  }
}
