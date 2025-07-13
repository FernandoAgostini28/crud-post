import { inject, Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface ScreenDimensions {
  isXSmall: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isXLarge: boolean;
  isHandset: boolean;
  isTablet: boolean;
  isWeb: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private breakpointObserver = inject(BreakpointObserver);
  screenSize$: Observable<ScreenDimensions>;
  constructor() {
    this.screenSize$ = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web,
      ])
      .pipe(
        map(
          (result: BreakpointState): ScreenDimensions => ({
            isXSmall: result.breakpoints[Breakpoints.XSmall],
            isSmall: result.breakpoints[Breakpoints.Small],
            isMedium: result.breakpoints[Breakpoints.Medium],
            isLarge: result.breakpoints[Breakpoints.Large],
            isXLarge: result.breakpoints[Breakpoints.XLarge],
            isHandset: result.breakpoints[Breakpoints.Handset],
            isTablet: result.breakpoints[Breakpoints.Tablet],
            isWeb: result.breakpoints[Breakpoints.Web],
          })
        ),
        shareReplay({ bufferSize: 1, refCount: true })
      );
  }
}
