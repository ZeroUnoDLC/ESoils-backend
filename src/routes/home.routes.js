import { Router } from "express";
import multer from 'multer';
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from 'uuid';
const router = Router();

// Define the storage destination and filename for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // Aquí puedes especificar la ruta donde quieres guardar los archivos // En este caso, usamos “…/…/IMG_BACKEND” como destino 
        cb(null, "../ESoils/images/")
    }, filename: function (req, file, cb) { // Aquí puedes especificar el nombre que quieres darle a los archivos // En este caso, usamos el nombre original del archivo con un prefijo “HOLA_” 
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

import {
    rutaPrincipal, postFisicas, PostRegistro_Suelos, postQuimicas, postClasification, postRegistro_Usuario2, postRegistro_Usuario1,
    postBiologicas, postBiologicas1, postBiologicas2, postIdUser, numRegSuelAdd, postNomenclature, getNameUser
} from "../controllers/home.controller.js";

router.get('/', rutaPrincipal);

router.post('/postRegistro_Usuario2', postRegistro_Usuario2);
router.post('/postRegistro_Usuario1', postRegistro_Usuario1);
router.post('/postFisicas', postFisicas);
router.post('/postQuimicas', postQuimicas);
router.post('/postBiologicas', postBiologicas);
router.post('/organism', postBiologicas1);
router.post('/macroinvertebrates', postBiologicas2);
router.post('/PostRegistro_Suelos', PostRegistro_Suelos);
router.post('/postClasification', postClasification);
router.post('/numRegSuelAdd', numRegSuelAdd);
// Use upload.single to handle a single file upload
router.post('/guardarImg', upload.single("file"));
router.post('/postNomenclature', postNomenclature);
router.post('/getNameUser', getNameUser);
router.post('/login', postIdUser);

export default router;