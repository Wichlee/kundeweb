import { CalendarModule, DateAdapter } from 'angular-calendar';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
    imports: [
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatOptionModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatStepperModule,
        MatToolbarModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatOptionModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatStepperModule,
        MatToolbarModule,
    ],
})
export class MaterialModule {}
