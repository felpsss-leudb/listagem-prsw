const usuarioModel = require("../models/usuarioModel");
const {body, validationResult} = require("express-validator");

const usuarioController = {

    //validação
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

    //métodos 

    cadastrar: async (req, res)=>{

        try{

            let listaErros = validationResult(req);
            if( listaErros.isEmpty() ){
                //não tem erro no formulário
                const dadosFormulario = {
                    "nome": req.body.nome,
                    "email":req.body.email,
                    "senha":req.body.senha
                };
                let resultado = await usuarioModel.create(dadosFormulario);

                if(resultado){
                    return res.render("pages/index");
                }else{
                    return res.render("pages/cadastro", 
                        {"listaErros":null, "valores":req.body}
                    )
                }

            }else{
                //erro no formulário
                res.render("pages/cadastro", 
                    {"listaErros":listaErros, "valores":req.body});
            }


        }catch(error){
            console.log(error);
            return false;
        }
    }

}


module.exports = usuarioController;

