// INDICAR A UTILIZAR DE ALGUMA FERRAMENTA PARA UPLOAD DE ARQUIVO
const multer  = require('multer');
const upload = multer({ dest: 'public/images' });

module.exports = { upload };
