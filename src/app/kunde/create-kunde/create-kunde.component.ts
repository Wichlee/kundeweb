import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { type KundeForm, type UserForm, toKunde, toUser } from './kundeForm';
import { first, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { CreateBetragComponent } from './create-betrag.component';
import { CreateEmailComponent } from './create-email.component';
import { CreateFamilienstandComponent } from './create-familienstand.component';
import { CreateGeburtsdatumComponent } from './create-geburtsdatum.component';
import { CreateGeschlechtComponent } from './create-geschlecht.component';
import { CreateHasNewsletterComponent } from './create-hasNewsletter.component';
import { CreateHomepageComponent } from './create-homepage.component';
import { CreateInteressenComponent } from './create-interessen.component';
import { CreateKategorieComponent } from './create-kategorie.component';
import { CreateNachnameComponent } from './create-nachname.component';
import { CreateOrtComponent } from './create-ort.component';
import { CreatePlzComponent } from './create-plz.component';
import { CreateUsernameComponent } from './create-username.component';
import { CreateWaehrungComponent } from './create-waehrung.component';
import { ErrorMessageComponent } from '../../shared/error-message.component';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { KundeWriteService } from '../shared/kundeWrite.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Router } from '@angular/router';
import { SaveError } from '../shared/errors';
import log from 'loglevel';

/**
 * Komponente mit dem CSS-Selektor &lt;hs-create-kunde&gt;, um Erfassungsformular f&uuml;r einen neuen Kunden zu realisieren.
 */
@Component({
    selector: 'hs-create-kunde',
    templateUrl: './create-kunde.component.html',
    imports: [
        CreateBetragComponent,
        CreateEmailComponent,
        CreateFamilienstandComponent,
        CreateGeburtsdatumComponent,
        CreateGeschlechtComponent,
        CreateHasNewsletterComponent,
        CreateHomepageComponent,
        CreateInteressenComponent,
        CreateKategorieComponent,
        CreateNachnameComponent,
        CreateOrtComponent,
        CreatePlzComponent,
        CreateUsernameComponent,
        CreateWaehrungComponent,
        ErrorMessageComponent,
        MatIconModule,
        NgIf,
        ReactiveFormsModule,
    ],
    standalone: true,
})
export class CreateKundeComponent {
    protected readonly form = new FormGroup({});

    showWarning = false;

    fertig = false;

    protected errorMsg: string | undefined = undefined;

    constructor(
        private readonly service: KundeWriteService,
        private readonly router: Router,
    ) {
        log.debug(
            'CreateKundeComponent.constructor: Injizierter Router:',
            router,
        );
    }

    /**
     * Die Methode <code>onSubmit</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um einen neuen Kunden anzulegen.
     */
    onSubmit() {
        if (this.form.invalid) {
            log.debug(
                'CreateKundeComponent.onSave: Validierungsfehler',
                this.form,
            );
            return;
        }

        const kundeForm = this.form.value as KundeForm;
        const userForm = this.form.value as UserForm;
        const neuerKunde = toKunde(kundeForm);
        log.debug('CreateKundeComponent.onSave: neuerKunde=', neuerKunde);
        const neuerUser = toUser(userForm);
        log.debug('CreateKundeComponent.onSave: neuerUser=', neuerUser);

        this.service
            .save(neuerKunde, neuerUser)
            .pipe(
                first(),
                tap(result => this.#setProps(result)),
            )
            .subscribe({ next: () => this.#navigateToHome() });
    }

    #setProps(result: SaveError | string) {
        if (result instanceof SaveError) {
            this.#handleError(result);
            return;
        }

        this.fertig = true;
        this.showWarning = false;
        this.errorMsg = undefined;

        const id = result;
        log.debug('CreateKundeComponent.onSave: id=', id);
    }

    #handleError(err: SaveError) {
        const { statuscode } = err;
        log.debug(
            `CreateKundeComponent.#handleError: statuscode=${statuscode}, err=`,
            err,
        );

        switch (statuscode) {
            case HttpStatusCode.UnprocessableEntity: {
                const { cause } = err;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                this.errorMsg =
                    cause instanceof HttpErrorResponse
                        ? cause.error
                        : JSON.stringify(cause);
                break;
            }

            case HttpStatusCode.TooManyRequests: {
                this.errorMsg =
                    'Zu viele Anfragen. Bitte versuchen Sie es später noch einmal.';
                break;
            }

            case HttpStatusCode.GatewayTimeout: {
                this.errorMsg =
                    'Der Server ist nicht erreichbar. Bitte versuchen Sie es später noch einmal.';
                log.error('Laeuft der Appserver? Port-Forwarding?');
                break;
            }

            default: {
                this.errorMsg = 'Ein unbekannt Fehler ist aufgetreten.';
                break;
            }
        }
    }

    async #navigateToHome() {
        if (this.errorMsg === undefined) {
            log.debug('CreateKundeComponent.#navigateToHome: success');
            await this.router.navigate(['/']);
        }
    }
}
