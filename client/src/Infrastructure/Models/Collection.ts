export class Collection<T> extends Array<T> {
    constructor() {
        super();
    }

    remove = (item: T) : void => {
        let index = this.findIndex(x => x === item);
        this.splice(index, 0);
    }

    clean = () : void => {
        this.splice(0, this.length);
    }
}
