import { InjectionToken, ValueProvider } from "@angular/core";

export interface AppConfig {
    production: boolean;
    baseURL: string;
  }
  
  export const APP_CONFIG = new InjectionToken<AppConfig>("spotify_music_clone.config");

  export const getApplicationConfigProvider = (value: AppConfig): ValueProvider => ({
    provide: APP_CONFIG,
    useValue: value
  })

  