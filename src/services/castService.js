import Cast from "../models/Cast.js";

export default {
    getAllCasts(filter = {}) {
        let query = Cast.find();

        if (filter.includes) {
            query = query.in('_id', filter.includes);
        }

        if (filter.excludes) {
            query = query.nin('_id', filter.excludes);
        }

        return query;
    },

    createCast(castData) {
        return Cast.create(castData);
    }
}