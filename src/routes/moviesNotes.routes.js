const { Router } = require("express");
//importando o router de dentro do próprio express

const MoviesNotesController = require("../controllers/MoviesNotesController");

const moviesNotesRoutes = Router();
//criando uma constante para ter o router e inicializando ele

//function myMiddleware(request, response, next){
  //  console.log("Voce passou pelo middleware");

    //next();
    //passando para o promixmo destino função
//}





const moviesNotesController = new MoviesNotesController();
//instanciando ele reservando espaço na memoria


moviesNotesRoutes.get("/", moviesNotesController.index);
moviesNotesRoutes.post("/:user_id", moviesNotesController.create);
moviesNotesRoutes.get("/:id", moviesNotesController.show);
moviesNotesRoutes.delete("/:id", moviesNotesController.delete);

module.exports = moviesNotesRoutes;
//fazendo com que a rota fique exposta e possa ser acessada usada pelo server