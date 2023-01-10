import { Component, Input } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import log from 'loglevel';

@Component({
    selector: 'hs-create-geburtsdatum',
    templateUrl: './create-geburtsdatum.component.html',
    imports: [
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateGeburtsdatumComponent {
    @Input()
    form!: FormGroup;

    protected readonly today = new Date();

    protected readonly geburtsdatum = new FormControl(this.today);

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit() {
        log.debug('CreateGeburtsdatumComponent.ngOnInit');
        this.form.addControl('geburtsdatum', this.geburtsdatum);
    }
}
