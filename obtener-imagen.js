// api/obtener-imagen.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const response = await fetch('https://www.lapalabradelobos.com');
        const html = await response.text();

        // Usamos una expresión regular para buscar la imagen de tapa
        const regex = /<div class="blog-media wf-td">.*?<img[^>]*src="([^"]*)"/;
        const match = html.match(regex);

        if (match && match[1]) {
            // Devolvemos la URL de la imagen en formato JSON
            res.status(200).json({ imagenURL: match[1] });
        } else {
            res.status(404).json({ error: 'No se encontró la imagen de tapa' });
        }
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).json({ error: 'Error al obtener la imagen' });
    }
}