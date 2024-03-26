const get = require('simple-get');
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/seguimiento', async function(req, res) {
    const packCode = req.query.orden;
    if (!packCode) {
        res.status(400).send('Falta el parámetro "orden"');
        return;
    }

    console.log("Iniciando petición...");
    try {
        const shipmentData = await getShipmentData(packCode);
        res.send(shipmentData);
    } catch (error) {
        console.error('Error al obtener los datos de envío:', error);
        res.status(500).send('Se produjo un error al obtener los datos de envío');
    }
});

async function getShipmentData(packCode) {
    return new Promise((resolve, reject) => {
        get({
            url: `https://api1.correos.es/digital-services/searchengines/api/v1/?text=${packCode}&language=ES&searchType=envio`,
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0'
            }
        }, function(err, response) {
            if (err) {
                reject(err);
                return;
            }

            let data = [];
            response.on('data', function(chunk) {
                const json = JSON.parse(chunk);
                if (json.code === "404" || json.code === "400") {
                    reject(new Error('Datos de envío no encontrados'));
                    return;
                }
                const shipments = json.shipment[0].events;
                try {
                    shipments.forEach((element, index) => {
                        data.push(`${element.extendedText} <br> ${element.eventDate} ${element.eventTime}`);
                    });
                    resolve(data);
                } catch (err) {
                    reject(err);
                }
            });
        });
    });
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
