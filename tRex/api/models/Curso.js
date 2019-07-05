
module.exports = {

    attributes: {

        nome:{
            type: 'string',
            maxLength: 64,
            riquired: true,
            exemple:'Engenharia de Software'
        },

        sigla:{
            type:'string',
            maxLength: 4,
            riquired:true,
            exemple:'ES'
        },

        descricao:{
            type:'string',
        },

    },

};