const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        //index é o nome que a gente dá pra esse método que faz a listagem de dados
        const { page = 1 } = request.query;
        //a listagem de todos os incidentes(casos) vai precisar ter paginação, pra retornar, por exemplo, de 5 em 5
        // estou passando o parâmetro page e, se ele não existir, eu passo por padrão o 1, que é a página 1

        const [count] = await connection('incidents').count();

        console.log(count);
        //esse count é o contador do números total de casos na aplicação
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //quando quero relacionar dados de mais de uma tabela, usamos o join
            //nesse join, estou comparando o ong_id com os seus incidentes específicos
            //como tanto ong quanto incident têm um id, preciso especificar quais dados quero, e isso colocamos no select
            .limit(5)
            .offset((page - 1) *5) //pra, na primeira página, ficar começando a partir do 0 e pegar os 5 primeiros registros e assim segue
           .select([
               'incidents.*',
               'ongs.name',
               'ongs.email',
               'ongs.whatsapp',
               'ongs.city',
               'ongs.uf'            
            ]);

        response.header('X-Total-Count', count['count(*)']);
        //passando no header da nossa response a informação no total de casos
    
        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        request.headers;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        //params é o parâmetro de rotas, que a gente aprendeu quando estudou os tipos de parâmetros
        const ong_id = request.headers.authorization;
        //id da ong logada que tá querendo deletar o caso
        //preciso verificar se esse caso realmente foi criado pela ong que tá tentando deletá-lo
        const incident = await connection('incidents')
            .where('id', id) //id é igual ao id passado ali no const {id}
            .select('ong_id') //selecionar apenas a coluna das ids das ongs
            .first(); //vai passar apenas um registro, pois só vai ter um incidente com esse id, então peço pra me retornar apenas um resultado mesmo

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' }) //o código 401 de status http é de unauthorized que é quando o usuário não tem autorização para fazer aquela ação
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //204 é 'no content' e o send é pra enviar a resposta sem corpo, ou seja, vazia
        
    }

}

//a informação de qual ong ou qual usuário está logado na nossa aplicação vem ATRAVÉS DO CABEÇALHO DA REQUISIÇÃO
//E NÃO DO CORPO DA REQUISIÇÃO
//o cabeçalho da requisição guarda informações do contexto da nossa requisição
//vem dados da autenticação do usuário, da localização (quando a gente quer mostrar uma mensagem em inglês ou português etc) e tudo que
//caracteriza o contexto daquela requisição

//authorization é o nome que demos, lá no Insomnia, ao header da requisição POST do caso, com valor que armazena a id gerada randomicamente pelo lance lá do crypto pra
//id de cada ong. Então cada ong tem uma id randômica

