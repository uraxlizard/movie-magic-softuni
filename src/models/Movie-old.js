import { v4 as uuidv4 } from "uuid";
import fs from 'fs/promises';

let dbJson = await fs.readFile('./src/db.json', { encoding: 'utf-8' });
let db = JSON.parse(dbJson);

export default class Movie {
    constructor(data) {
        Object.assign(this, data);
        this._id = uuidv4();
    }

    static find(filter = {}) {
        let result = db.movies.slice();

        if (filter.id) {
            result = result.filter(m => m._id === filter._id);
        }

        if (filter.title) {
            result = result.filter(m => m.title?.toLowerCase().includes(filter.title.toLowerCase()));
        }

        if (filter.genre) {
            result = result.filter(m => m.genre?.toLowerCase().includes(filter.genre.toLowerCase()));
        }

        if (filter.year) {
            result = result.filter(m => m.year === filter.year);
        }

        return result;
    }

    static findOne(filter = {}) {
        let result = db.movies[0];
        
        if (filter._id) {
            result = db.movies.find(m => m._id === filter._id);
        }

        return result;
    }

    get id() {
        return this._id;
    }

    async save() {
        db.movies.push(this);

        const dbJson = JSON.stringify(db, null, 2);
        await fs.writeFile("./src/db.json", dbJson);

        return this;
    }
}