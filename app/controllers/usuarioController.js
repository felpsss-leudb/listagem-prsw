const usuarioModel = require("../models/usuarioModel");
const {body, validationResult} = require("express-validator");

const usuarioController = {

        validacaoFormCad : [
            body("nome").isLength({min:3,max:45})
                .withMessage("Nome de usuario deve ter no mínimo 3 letras e no máximo 45 letras"),
            body("email").isEmail()
                .withMessage("O e-mail deve ser válido!"),
            body("senha").isStrongPassword()
                .withMessage("Senha deve possuir letras maiúsculas e minusculas,"+
                    " números e caractere especial e no mínimo 8 caracteres"),
            body("c-senha").custom( (value, {req} )=> {
                if(value == req.body.senha){
                    return true;
                }else{
                    throw new Error("As senhas são diferentes");                    
                }
            })
        ],

        validacaoCliente: [
            body("nome")
              .isLength({ min: 3, max: 45 })
              .withMessage("Nome do cliente deve conter de 5 a 45 letras!"),
            body("nomeUsuario")
              .isLength({ min: 3, max: 45 })
              .withMessage("Nome de usuário do cliente deve conter de 5 a 45 caracteres!"),
            body("email")
                .isEmail(),
            body("senha")
                .isStrongPassword(),
            body("cep")
                .isLength({max: 8 })
                .notEmpty()
                .withMessage("CEP inválido!"),
            body("tipo")
                .isIn(["1", "2"])
                .withMessage("Tipo de usuário inválido"),
            body("status")
                .isIn(["0", "1"])
                .withMessage("Status inválido")
          ],

    cadastrar: async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(errors);
            return res.render('pages/cadastro', {
                campos: req.body,
                listaErros: errors
            })
        }

        var dadosFormulario = {
            nome_usuario: req.body.nome,
            email_usuario:req.body.email,
            senha_usuario:req.body.senha
        }

        try {
            results = await usuarioModel.create(dadosFormulario)
            res.redirect("/")
        
        } catch (e) {
            console.log(e)
            res.json({erro: "falha ao acessar dados"})
        }
    },

    listarClientes: async (req, res) => {
        try {
            let results = await usuarioModel.findAll({raw: true});
          res.render("pages/adm-cliente", { users: results });
        } catch (e) {
          console.log(e); 
          res.json({ erro: "Falha ao acessar dados" });
        }
    },

    adicionarCliente: async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(errors);
            return res.render('pages/adm-cliente-novo', {
                campos: req.body,
                listaErros: errors
            })
        }

        var dadosFormulario = {
            nome_usuario: req.body.nome,
            cep_usuario: req.body.cep,
            img_perfil_pasta: req.body.ImagemPerfil,
            user_usuario: req.body.nomeUsuario,
            email_usuario:req.body.email,
            senha_usuario:req.body.senha,
            tipo_usuario: req.body.tipo,
            status_usuario: req.body.status
        }

        try {
            results = await usuarioModel.create(dadosFormulario)
            res.redirect("/adm/adm-cliente")
        
        } catch (e) {
            console.log(e)
            res.json({erro: "falha ao acessar dados"})
        }
    },

    editarCliente: async (req,res) => {
        let { id } = req.query;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(errors);
            return res.render('pages/adm-cliente-edit', {
                campos: req.body,
                listaErros: errors
            })
        }

        var dadosFormulario = {
            nome_usuario: req.body.nome,
            cep_usuario: req.body.cep,
            img_perfil_pasta: req.body.ImagemPerfil,
            user_usuario: req.body.nomeUsuario,
            email_usuario:req.body.email,
            senha_usuario:req.body.senha,
            tipo_usuario: req.body.tipo,
            status_usuario: req.body.status
        }

        try {
            results = await usuarioModel.update(dadosFormulario, id)
            res.redirect("/adm/adm-cliente")
        
        } catch (e) {
            console.log(e)
            res.json({erro: "falha ao acessar dados"})
        }
    },

    exibirClienteExcluir: async (req,res) => {
        let { id } = req.query;
        try {
            let usuario = await usuarioModel.findId(id);
            res.render("pages/adm-cliente-del", {
              usuario: usuario[0],
              listaErros: null
            });
        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },

    exibirDetalhesCliente: async (req,res) => {
        let { id } = req.query;
        try {
            let usuario = await usuarioModel.findId(id);
            res.render("pages/adm-cliente-list", {
              usuario: usuario[0],
              listaErros: null
            });
        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },

    exibirClienteEditar: async (req,res) => {
        let { id } = req.query;
        try {
            let usuario = await usuarioModel.findId(id);
            res.render("pages/adm-cliente-edit", {
              usuario: usuario[0],
              listaErros: null
            });
        } catch (e) {
            console.log(e);
            res.json({ erro: "Falha ao acessar dados" });
        }
    },

    excluirCliente: async (req, res) => {
        let { id } = req.query;
        try {
          results = await usuarioModel.delete(id);
          res.redirect("/adm/adm-cliente");
        } catch (e) {
          console.log(e);
          res.json({ erro: "Falha ao acessar dados" });
        }
    },
    

}


module.exports = usuarioController;

