import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CpToastService {
  private _snackBar = inject(MatSnackBar);

  open(message: string, action: string = 'Fechar', duration: number = 5000) {
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }
}
