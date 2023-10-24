const { Router } = require("express");
//importando o router do express

const usersRouter = require("./users.routes");
const moviesNotesRouter = require("./moviesNotes.routes");
const moviesTagsRouter = require("./moviesTags.routes");

const routes = Router();


routes.use("/users", usersRouter);
routes.use("/moviesNotes", moviesNotesRouter);
routes.use("/moviesTags", moviesTagsRouter);
//toda vez que alguem acessar /users vai ser redirecionado para o usersRouter

module.exports = routes;