import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatProgressBarModule,
        MatToolbarModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatProgressBarModule,
        MatToolbarModule,
    ],
})
export class MaterialModule {}
