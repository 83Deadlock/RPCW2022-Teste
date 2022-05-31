var Ligacao = require('../models/ligacoes')
var Cidade = require('../models/cidades')

module.exports.listarCidade = () => {
    return Cidade
        .find({}, { _id: 0, id: 1, nome: 1, distrito: 1 })
        .exec()
}

module.exports.listarDistrito = () => {
    return Cidade
        .find({}, { _id: 0, id: 1, nome: 1, distrito: 1 })
        .exec()
}

module.exports.lookUpCidadeID = ident => {
    return Cidade
        .find({ id: ident })
        .exec()
}

module.exports.lookUpCidadeIDNome = ident => {
    return Cidade
        .find({ id: ident }, { _id: 0, nome: 1 })
        .exec()
}

module.exports.lookUpDistrito = d => {
    return Cidade
        .find({ distrito: d }, { _id: 0, id: 1, nome: 1 })
        .exec()
}

module.exports.lookUpCidadesNome = n => {
    return Cidade
        .find({}, { _id: 0, nome: 1 })
        .exec()
}


module.exports.listarLigacao = () => {
    return Ligacao
        .find()
        .exec()
}

module.exports.lookUpOrigem = o => {
    return Ligacao
        .find({ origem: o }, { _id: 0, id: 1, destino: 1 })
        .exec()
}

module.exports.lookUpDistancia = () => {
    return Ligacao
        .find({}, { _id: 0, id: 1, origem: 1, destino: 1, distancia: 1 })
        .exec()
}