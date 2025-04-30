const pool = require("../../config/pool_conexoes");

const usuarioModel = {
    //metodo para retornar todo os registros da entidade usuario
    findAll: async () => {
        
        try {
            const [resultados, estrutura] = await
                pool.query("SELECT * FROM usuario u, tipo_usuario t " + " where t.id_tipo_usuario = u.tipo_usuario and u.status_usuario = 1;");
            console.log(resultados);
            console.log(estrutura);
            return resultados;
        } catch (erro) {
            console.log(erro);
            return false;
        }

    },

    findId: async (id) => {
        
        try {
            const [resultados] = await
                pool.query("SELECT * FROM usuario WHERE status_usuario = 1 and id_usuario = ?",[id]);
            console.log(resultados);
            return resultados;
        } catch (erro) {
            console.log(erro);
            return false;
        }

    },

    create: async (dadosFormulario) => {
        try{
            const [resultados] = await pool.query('INSERT INTO usuario SET ?', [dadosFormulario]);
            return resultados;
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    update: async (dadosFormulario, id) => {
        try {
            const [resultados] = await pool.query('UPDATE usuario SET ? WHERE id_usuario = ?', [dadosFormulario, id])
            return resultados;
        } catch (error) {
            return error;
        }  
    },

    delete: async (id) => {
        try {
            const [resultado] = await pool.query('UPDATE usuario SET status_usuario = 0  WHERE id_usuario = ?', [id])
            return resultado;
        } catch (error) {
            return error;
        }  
    },

}

module.exports = usuarioModel;