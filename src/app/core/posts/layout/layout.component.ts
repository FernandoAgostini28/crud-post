import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../shared/material/material.module';
import { PostHeaderComponent } from '../compoenents/header/post-header.component';
import {
  BreakpointService,
  ScreenDimensions,
} from '../../services/breakpoint.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModule, PostHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  private breakpointService = inject(BreakpointService);
  screenSize$: Observable<ScreenDimensions> =
    this.breakpointService.screenSize$;
}
