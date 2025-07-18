import {
  Component,
  Input,
  Injector,
  OnDestroy,
  OnInit,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-cp-form-field',
  standalone: true,
  imports: [MaterialModule],
  styleUrl: './cp-form-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CpFormFieldComponent),
      multi: true,
    },
  ],
  template: `
    <mat-form-field class="full-width" appearance="outline">
      <mat-label>{{ label }}</mat-label>

      <textarea
        *ngIf="type === 'textarea'"
        matInput
        [formControl]="control"
        (blur)="onTouched()"
        [placeholder]="placeholder || ''"
      ></textarea>

      <input
        *ngIf="type !== 'textarea'"
        matInput
        (blur)="onTouched()"
        [type]="type"
        [formControl]="control"
        [placeholder]="placeholder || ''"
      />

      <mat-error *ngIf="ngControl?.control as ctrl">
        <ng-container *ngIf="ctrl.hasError('required')">
          Este campo é **obrigatório**.
        </ng-container>
        <ng-container *ngIf="ctrl.hasError('email')">
          Por favor, insira um **e-mail válido**.
        </ng-container>
        <ng-container *ngIf="ctrl.hasError('minlength')">
          Mínimo de {{ ctrl.errors?.['minlength']?.requiredLength }} caracteres.
        </ng-container>
        <ng-container *ngIf="ctrl.hasError('maxlength')">
          Máximo de {{ ctrl.errors?.['maxlength']?.requiredLength }} caracteres.
        </ng-container>
        <ng-container *ngIf="!ctrl.hasError('required') && !ctrl.valid">
          Campo inválido.
        </ng-container>
      </mat-error>
    </mat-form-field>
  `,
})
export class CpFormFieldComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  private injector = inject(Injector);
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'textarea' = 'text';

  public ngControl: NgControl | null = null;

  control = new FormControl<string | number>('');
  private destroy$ = new Subject<void>();

  onChange: (value: string | number | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onChange(value);
      });

    if (this.ngControl?.control) {
      this.ngControl.control.statusChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          const errors = this.ngControl?.control?.errors ?? null;
          this.control.setErrors(errors, { emitEvent: false });
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: string | number | null): void {
    this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
