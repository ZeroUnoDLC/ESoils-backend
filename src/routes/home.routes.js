import { Router } from "express";
import multer from 'multer';
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from 'uuid';
const router = Router();

// Define the storage destination and filename for multer
const storage = multer.diskStorage({
    destination: async function (req, file, cb) { 
        // Create a blob client using the storage account name and access key or connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
        // Get a reference to the container where you want to store your images
        const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
        // Create the container if it does not exist
        await containerClient.createIfNotExists();
        // Pass the container client to the callback
        cb(null, containerClient)
    }, 
    filename: function (req, file, cb) { 
        // Generate a unique name for each file using uuid
        const uniqueName = uuidv4() + path.extname(file.originalname);
        // Include the container name in the filename
        const filename = `${process.env.AZURE_STORAGE_CONTAINER_NAME}/${uniqueName}`;
        // Pass the filename to the callback
        cb(null, filename)
    }
});
const upload = multer({ storage: storage });

import { rutaPrincipal, postFisicas, PostRegistro_Suelos, postQuimicas, postClasification, postRegistro_Usuario2, postRegistro_Usuario1,
    postBiologicas,postBiologicas1,postBiologicasSub1, postBiologicas2, postIdUser, numRegSuelAdd, guardarImg } from "../controllers/home.controller.js";

    router.get('/',rutaPrincipal);

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
router.post('/guardarImg', upload.single("file"), guardarImg);
router.post('/postNomenclature', postNomenclature);
router.post('/login',postIdUser);

export default router;