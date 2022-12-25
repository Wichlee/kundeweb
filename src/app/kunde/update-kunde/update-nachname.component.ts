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
    private static readonly MIN_LENGTH = 2;

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
            Validators.minLength(UpdateNachnameComponent.MIN_LENGTH),
            Validators.pattern(/^\w/u),
        ]);
        this.form.addControl('nachname', this.nachname);
    }
}
