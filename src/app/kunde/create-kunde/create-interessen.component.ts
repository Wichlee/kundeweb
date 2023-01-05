import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-interessen&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-interessen',
    templateUrl: './create-interessen.component.html',
    imports: [FormsModule, ReactiveFormsModule],
    standalone: true,
})
export class CreateInteressenComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected readonly sport = new FormControl(false);

    protected readonly lesen = new FormControl(false);

    protected readonly reisen = new FormControl(false);

    ngOnInit() {
        log.debug('CreateInteressenComponent.ngOnInit');
        this.form.addControl('sport', new FormControl(false));
        this.form.addControl('lesen', new FormControl(false));
        this.form.addControl('reisen', new FormControl(false));
    }
}
