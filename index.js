const get = require('simple-get')
const express = require('express')
const app = express()

app.get('/', function(req, response) {
    response.sendFile(__dirname + "/public/index.html")
})
app.get('/seguimiento', function(req, response) {
    var PackCode = req.query.orden
    if(!PackCode){
		return;
	} else {
		 console.log("iniciando peticion...")
    get({
        url: `https://api1.correos.es/digital-services/searchengines/api/v1/?text=${PackCode}&language=ES&searchType=envio`,
        method: 'GET',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0'
        }
    }, function(err, res) {
        if (err) throw err
        res.on('data', function(chunk) {
            var json = JSON.parse(chunk);
            if (json.code == "404" || json.code == "400") {
                response.send(`Introduciste alguno de los datos mal.`)
            } else {
                var shipments = json.shipment[0].events
                var data = []
                try {
                    shipments.forEach((element, index) => {
                        data.push(element.extendedText + " <br>" + element.eventDate + " " + element.eventTime )
                    });
                } catch (err) {
                    console.log(err)
                }
               response.send(data)
            }
        })


    })
	}

})

.listen(3000, () => console.log("Servidor iniciado en el puerto 3000"))
