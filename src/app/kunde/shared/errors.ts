/*
 * Copyright (C) 2020 - present Juergen Zimmermann, Hochschule Karlsruhe
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

/* eslint-disable max-classes-per-file, no-useless-constructor, no-empty-function */

export class FindError {
    constructor(readonly statuscode: number, readonly cause?: Error) {}
}

export class SaveError {
    constructor(readonly statuscode: number, readonly cause?: Error | string) {}
}

export class UpdateError {
    constructor(readonly statuscode: number, readonly cause?: Error | string) {}
}

export class RemoveError {
    constructor(readonly statuscode: number) {}
}

/* eslint-enable max-classes-per-file, no-useless-constructor, no-empty-function */
