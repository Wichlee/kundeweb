export class KeineKundenError extends Error {
    constructor() {
        super('Es gibt keine Kunden');
        this.name = 'KeineKundenError';
    }
}
