import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {}
