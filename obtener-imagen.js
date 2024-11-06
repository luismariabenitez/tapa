// api/obtener-imagen.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const response = await fetch('https://www.lapalabradelobos.com');
        
        // Verifica si la respuesta es correcta
        if (!response.ok) {
            return res.status(500).json({ error: 'No se pudo obtener la página de origen.' });
        }

        const html = await response.text();

        // Usa una expresión regular para encontrar la URL de la imagen
        const regex = /<div class="blog-media wf-td">.*?<img[^>]*src="([^"]*)"/s;
        const match = html.match(regex);

        if (match && match[1]) {
            // Devuelve la URL de la imagen en formato JSON
            return res.status(200).json({ imagenURL: match[1] });
        } else {
            // Devuelve un mensaje de error si no se encuentra la imagen
            return res.status(404).json({ error: 'No se encontró la imagen de tapa en la página.' });
        }
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        res.status(500).json({ error: 'Error interno al obtener la imagen.' });
    }
}
