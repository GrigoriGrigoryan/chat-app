export class User {
    name: string;
    createdAt: string;

    constructor(name: string) {
        this.name = name;
        this.createdAt = new Date(Date.now()).toLocaleString('en-US');
    }
}
