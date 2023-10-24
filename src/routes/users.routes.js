const { Router } = require("express");
//importando o router de dentro do próprio express

const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();
//criando uma constante para ter o router e inicializando ele

//function myMiddleware(request, response, next){
  //  console.log("Voce passou pelo middleware");

    //next();
    //passando para o promixmo destino função
//}





const usersController = new UsersController();
//instanciando ele reservando espaço na memoria

usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

module.exports = usersRoutes;
//fazendo com que a rota fique exposta e possa ser acessada usada pelo server