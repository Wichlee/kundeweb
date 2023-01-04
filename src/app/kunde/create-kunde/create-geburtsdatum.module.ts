import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateGeburtsdatumComponent } from './create-geburtsdatum.component';
import { NgModule } from '@angular/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
    imports: [
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [CreateGeburtsdatumComponent],
    exports: [CreateGeburtsdatumComponent],
})
export class CreateGeburtsdatumModule {}
