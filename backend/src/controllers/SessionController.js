const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) { //se a ong nao existir
            return response.status(400).json({ error: 'No ong found with this id' });
        }

        return response.json(ong);

    }
}

//a única coisa pra validar o login, nesse método create, é verificar se a ong existe, pra validar ologin dela
//buscamos o id da ong