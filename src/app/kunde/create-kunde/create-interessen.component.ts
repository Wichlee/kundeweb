import { Component, Input, type OnInit } from '@angular/core';
import {
    FormControl,
    type FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import log from 'loglevel';

/**
 * Komponente f&uuml;r den CSS-Selektor &lt;hs-create-interessen&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-interessen',
    templateUrl: './create-interessen.component.html',
    imports: [
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateInteressenComponent implements OnInit {
    @Input()
    form!: FormGroup;

    protected sport = new FormControl(false);

    protected lesen = new FormControl(false);

    protected reisen = new FormControl(false);

    ngOnInit() {
        log.debug('CreateInteressenComponent.ngOnInit');
        this.form.addControl('S', new FormControl(false));
        this.form.addControl('L', new FormControl(false));
        this.form.addControl('R', new FormControl(false));
    }
}
