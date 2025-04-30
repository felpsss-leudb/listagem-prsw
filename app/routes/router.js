const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

const {body, validationResult} = require("express-validator")

router.get("/", (req, res)=>{
    res.render("pages/index");
});

router.get("/login", (req, res)=>{
    res.render("pages/login");
} );

router.get("/cadastro", (req, res)=>{
    res.render("pages/cadastro",
        {"listaErros":null, "valores":{
            "nome":"", "email":"",
            "senha":"","c-senha":""
        }}
    )
});

router.post("/cadastro", 
    usuarioController.validacaoFormCad ,
    (req, res) =>{
        usuarioController.cadastrar(req, res);
    } );



router.get("/perfil", (req, res)=>{
    res.render("pages/perfil")
});


module.exports = router