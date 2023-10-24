const knex = require("../database/knex");

class MoviesTagsController {
    async index(request, response) {
        const {user_id} = request.params;

        const moviesTags = await knex("moviesTags")
        .where({ user_id })

        return response.json(moviesTags);
    }
}

module.exports = MoviesTagsController;