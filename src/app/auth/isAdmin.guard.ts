/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
    type CanMatchFn,
    type Route,
    type UrlSegment,
    type UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { type Observable } from 'rxjs';
import { inject } from '@angular/core';
import log from 'loglevel';

// https://angular.io/api/router/CanMatch
// https://angular.io/guide/router#can-activate-guard
// https://angular.io/api/router/CanActivate
// https://blog.angularindepth.com/new-in-angular-v7-1-updates-to-the-router-fd67d526ad05

export const isAdminGuard: CanMatchFn = (
    _: Route, // eslint-disable-line @typescript-eslint/no-unused-vars
    __: UrlSegment[], // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
):
    | Observable<UrlTree | boolean>
    | Promise<UrlTree | boolean>
    | UrlTree
    | boolean => {
    const authService = inject(AuthService);
    if (authService.isAdmin) {
        log.debug('isAdminGuard: true');
        return true;
    }

    log.debug('isAdminGuard: false');
    return false;
};
