import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  setItem(key: string, data: any, expirationMinutes: number = 60): void {
    const expirationTime = new Date().getTime() + expirationMinutes * 60 * 1000;
    const cacheItem = {
      data: data,
      expiration: expirationTime,
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      const cacheItem = JSON.parse(item);
      if (cacheItem.expiration >= new Date().getTime()) {
        return cacheItem.data as T;
      } else {
        // Cache has expired, remove it
        this.removeItem(key);
      }
    }
    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
