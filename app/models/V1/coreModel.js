class CoreModel {
    #id;
    #created_at;
    #updated_at;

    constructor(obj) {
        this.#id = obj.id;
        this.#created_at = obj.created_at;
        this.#updated_at = obj.updated_at;
    }

    get id() {
        return this.#id;
    }
    set id(newid) {
        this.#id = newid;
    }
}

module.exports = CoreModel;