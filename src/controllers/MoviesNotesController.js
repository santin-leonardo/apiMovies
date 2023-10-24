const { response } = require("express");
const knex = require("../database/knex");

class MoviesNotesController {
    async create(request,response) {
        const{title, description,rating, moviesTags,} = request.body;
        const {user_id} = request.params;

        const [moviesNotes_id] = await knex("MoviesNotes").insert({
            title,
            description,
            rating,
            user_id
        });

        const moviesTagsInsert = moviesTags.map(name => {
            return {
                moviesNotes_id,
                name,
                user_id
            }
        });

        await knex("moviesTags").insert(moviesTagsInsert);

        response.json();
    }

    async show(request, response) {
        const { id } = request.params;

        const moviesNotes = await knex("moviesNotes").where({ id }).first();
        const moviesTags = await knex("moviesTags").where({ moviesNotes_id: id}).orderBy("name");

        //return response.json(note);
        return response.json({
            ...moviesNotes,
            moviesTags,
        });
    }

    async delete(request,response){
        const { id } = request.params;

        await knex("moviesNotes").where({id}).delete();

        return response.json();
    }

    async index(request, response) {
        const { title,user_id,moviesTags} = request.query;

        let moviesNotes;

        if(moviesTags){
            const filterMoviesTags = moviesTags.split(',').map(movieTag => movieTag.trim());
            

            moviesNotes = await knex("moviesTags")
            .select([
                "moviesNotes.id",
                "moviesNotes.title",
                "moviesNotes.user_id",
            ])
            .where("moviesNotes.user_id", user_id)
            .whereLike("moviesNotes.title", `%${title}%`)
            .whereIn("name", filterMoviesTags)
            .innerJoin("moviesNotes", "moviesNotes.id", "moviesTags.moviesNotes_id")
            .orderBy("moviesNotes.title")

        }else {
            moviesNotes = await knex("moviesNotes")
            .where({user_id})
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }    

        const userMoviesTags = await knex("moviesTags").where({user_id});
        const moviesNotesWithMoviesTags = moviesNotes.map(movieNote => {
            const movieNoteMoviesTags = userMoviesTags.filter(movieTag => movieTag.movieNote_id === movieNote.id);

            return {
                ...movieNote,
                moviesTags: movieNoteMoviesTags
            }
        });



        return response.json({ moviesNotesWithMoviesTags});
    }
}

module.exports = MoviesNotesController;