var express = require('express');
var router = express.Router();
var axios = require('axios');

apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxMTc4MSwiZXhwIjoxNjU0MDQwNTgxfQ.v51pBpdxO4gKmaCRRmShTwK8ZHSiLZe7Ruj-BhsIehfLS3gZB6-K9yr6ugdzvhxjBVQLdZ9fVVtVrVxLcM9WIs-vxgAR9pxd5ZjPamPkdZdrGRDmLqKMEApDKujmnKBqoZo7MRMHvYqWK9kUBO7UkFLtJ1J1Bcj3XxISViPCu4nyx9t6ata2LOazAbdfc_obhimelT_gD9VKHTpIb8uJgGnUNj-ZZRsyIsK30F0U6o5hz2Fq22y11MACYQzog8hdaqyt-1tzd7sBDHabSsAuqLh-239tpzTnH8qJ9i124DEBX6xbIPz3r6iaKzJgTzoC4BbFqzTpMfAJ1eKgfTcP7g"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial' });
});

router.get('/classes', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + apikey)
    .then(response => {
      var lista = response.data

      res.render('nivel1', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});


router.get('/classes/:code', function(req, res, next) {
  al = req.params.code
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + al + "?token=" + apikey)
    .then(response => {
      var lista = response.data

      res.render('classes', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});

router.get('/termos', function(req, res, next) {
  al = req.params.code
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" + apikey)
    .then(response => {
      var lista = response.data

      res.render('indice', {dados: lista})
      })
      .catch(function(erro){
        res.render('error', { erro: 'erro' });
      })
});

module.exports = router;
