var express = require('express');
var router = express.Router();
var Mapa = require('../controllers/mapa');

/* GET home page. */
router.get('/cidades', function (req, res, next) {
  var query = req.query
  if (query['distrito']) {
    Mapa.lookUpDistrito(query['distrito'])
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.render('error', { error: error }))
  }
  else {
    Mapa.listarCidade()
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.render('error', { error: error }))
  }
});

router.get('/distritos', function (req, res, next) {
  Mapa.listarDistrito()
    .then(data => {
      var dist = {}
      data.forEach(d => {
        if (!dist[d.distrito]) {
          dist[d.distrito] = [{ 'id': d.id, 'cidade': d.nome }]
        }
        else {
          dist[d.distrito].push({ 'id': d.id, 'cidade': d.nome })
        }
      })
      res.status(200).jsonp(dist)
    })
    .catch(error => res.render('error', { error: error }))
});


router.get('/cidades/nomes', function (req, res, next) {
  Mapa.lookUpCidadesNome()
    .then(data => {
      var nomes = []
      data.forEach(n => {
        if (!nomes.includes(n['nomes']))
          nomes.push(n['nome'])
      })
      nomes.sort()
      res.status(200).jsonp(nomes)
    })

    .catch(error => res.render('error', { error: error }))
});

router.get('/cidades/:id', function (req, res, next) {
  var id = req.params.id
  Mapa.lookUpCidadeID(id)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.render('error', { error: error }))
});

router.get('/ligacoes', function (req, res, next) {
  var query = req.query
  if (query['origem']) {
    Mapa.listarCidade()
      .then(data => {
        var cidades = {}
        data.forEach(c => cidades[c.id] = c.nome)
        Mapa.lookUpOrigem(query['origem'])
          .then(dados => {
            var lig = []
            dados.forEach(o => {
              lig.push({ 'id': o.id, 'destino': o.destino, 'nome': cidades[o.destino] })
            })
            res.status(200).jsonp(lig)
          })
          .catch(error => res.render('error', { error: error }))
      })
      .catch(error => res.render('error', { error: error }))
  }
  else if (query['dist']) {
    console.log("aqui")
    Mapa.listarCidade()
      .then(data => {
        var cidades = {}
        data.forEach(c => cidades[c.id] = c.nome)
        console.log("aqui2")
        Mapa.lookUpDistancia()
          .then(dados => {
            console.log("aqui3")
            var lig = []
            dados.forEach(o => {
              console.log(o.distancia)
              if (o.distancia >= query['dist']) {
                console.log(o.distancia)
                lig.push({ 'id': o.id, 'idOrigem': o.origem, 'nomeOrigem': cidades[o.origem], 'idDestino': o.destino, 'nomeDestino': cidades[o.destino] })
              }
            })
            res.status(200).jsonp(lig)
          })
          .catch(error => res.render('error', { error: error }))
      })
      .catch(error => res.render('error', { error: error }))
  }
  else {
    Mapa.listarLigacao()
      .then(data => res.status(200).jsonp(data))
      .catch(error => res.render('error', { error: error }))
  }
});


module.exports = router;