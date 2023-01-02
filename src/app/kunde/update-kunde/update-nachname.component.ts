import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import log from 'loglevel';
// eslint-disable-next-line sort-imports
import { NACHNAME_REGEX } from '../shared/kunde';

/**
 * Komponente f&uuml;r den CSS-Selektor <code>hs-update-nachname</code>
 */
@Component({
    selector: 'hs-update-nachname',
    templateUrl: './update-nachname.component.html',
    imports: [FormsModule, NgIf, ReactiveFormsModule],
    standalone: true,
})
export class UpdateNachnameComponent implements OnInit {
    // <hs-update-nachname [form]="form" [currentValue]="...">
    @Input()
    form!: FormGroup;

    @Input()
    currentValue!: string;

    protected nachname!: FormControl;

    ngOnInit() {
        log.debug(
            'UpdateNachnameComponent.ngOnInit: currentValue=',
            this.currentValue,
        );
        // siehe formControlName innerhalb @Component({templateUrl: ...})
        this.nachname = new FormControl(this.currentValue, [
            Validators.required,
            Validators.pattern(NACHNAME_REGEX),
        ]);
        this.form.addControl('nachname', this.nachname);
    }
}
