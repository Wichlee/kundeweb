import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { type KundeForm, toKunde } from './kundeForm';
import { first, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { CreateAdresseComponent } from './create-adresse.component';
import { CreateEmailComponent } from './create-email.component';
import { CreateFamilienstandComponent } from './create-familienstand.component';
import { CreateGeburtsdatumComponent } from './create-geburtsdatum.component';
import { CreateGeschlechtComponent } from './create-geschlecht.component';
import { CreateHasNewsletterComponent } from './create-hasNewsletter.component';
import { CreateHomepageComponent } from './create-homepage.component';
import { CreateInteressenComponent } from './create-interessen.component';
import { CreateKategorieComponent } from './create-kategorie.component';
import { CreateNachnameComponent } from './create-nachname.component';
import { CreateUmsatzComponent } from './create-umsatz.component';
import { CreateUsernameComponent } from './create-username.component';
import { ErrorMessageComponent } from '../../shared/error-message.component';
import { KundeWriteService } from '../shared/kundeWrite.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SaveError } from '../shared/errors';
import log from 'loglevel';


