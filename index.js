import express from 'express'
import fetch from 'node-fetch'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

const __filename = fileURLToPath(import.meta.url); 

const __dirname = path.dirname(__filename); 

app.use(express.static(path.join(__dirname, 'public')));


app.get('/:num', async function(req, res) {
    const NumSeguimiento = req.params.num;

    if (!NumSeguimiento) {
        return res.status(400).json({
            "error": "Debes introducir algún código de seguimiento"
        });
    }

    try {
        const response = await fetch(`https://api1.correos.es/digital-services/searchengines/api/v1/?text=${NumSeguimiento}&language=ES&searchType=envio`);

        if (!response.ok) {
            return res.status(response.status).json({
                "error": "Error en la comunicación con el servicio externo"
            });
        }

        const data = await response.json();
        return res.json(data);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            "error": "Ha ocurrido algún error interno en el servidor"
        });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000...");
});
