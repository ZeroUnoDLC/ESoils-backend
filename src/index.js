import app from "./app.js";

app.listen(app.get('port'));
console.log(`Servidor en el puerto ${app.get('port')} || url: ${app.get('url')}`);