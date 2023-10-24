require("express-async-errors");

//const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const express = require('express');

const routes = require("./routes");
//importando as rotas

//migrationsRun();

const app = express();
app.use(express.json());
//ta dizendo em que formato os dados vao chegar


app.use(routes);



app.use(( error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error", message: error.message
        });
    }//verifica se foi um erro por parte do cliente

    console.error(error);
    //caso precisar debug do erro

    return response.status(500).json({
        status: "error", message: "Internal server error"
    })//diz que é erro no servidor
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));