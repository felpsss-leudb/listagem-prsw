const express = require("express");
const usuarioController = require("../controllers/usuarioController");
const router = express.Router();


router.get("/", (req, res)=>{
    res.render("pages/index-adm");
});

router.get("/adm-cliente", (req, res)=>{
    usuarioController.listarClientes(req, res);
});

router.get("/adm-cliente-novo", (req, res)=>{
    res.render("pages/adm-cliente-novo", {
        campos:{nome:"", email:"", senha:"", nomeUsuario:"", cep:"", tipo:"1", status:"1"}, 
        listaErros: null });
})

router.get("/adm-cliente-edit", (req, res)=>{
    usuarioController.exibirClienteEditar(req, res);
})

router.get("/adm-cliente-list", (req, res)=>{
    usuarioController.exibirDetalhesCliente(req, res);
})

router.get("/adm-cliente-del", (req, res)=>{
    usuarioController.exibirClienteExcluir(req, res);
});

router.post("/adm-cliente-novo", usuarioController.validacaoCliente, function (req, res) {
    usuarioController.adicionarCliente(req, res);
  }
);

router.post("/excluir", (req, res)=>{
    usuarioController.excluirCliente(req, res);
});

router.post("/editar", (req, res)=>{
    usuarioController.editarCliente(req, res);
});



module.exports = router