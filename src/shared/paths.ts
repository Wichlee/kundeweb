/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
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

// "Reverse Proxy": eingehende Requests werden an einen anderen HTTP-Server
// weitergeleitet ("forward") und analog wird der Response an den aufrufenden
// Client weitergeleitet.
// Dabei werden ggf. Header-Daten umgeschrieben, Transformationen zwischen
// HTTP und HTTPS koennen noetig sein und GZip-Komprimierung kann erfolgen.
// Vorteile fuer ein abgeschirmtes Backend:
// + HTTPS
// + (De-) Komprimierung mit GZip
// + API-Gateway mit Routing

/**
 * Basis-Pfade fuer den REST-Server via Reverse Proxy
 */
export const paths = {
    base: '/rest',
    login: '/rest/auth/login',
};
