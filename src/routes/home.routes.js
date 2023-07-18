import { Router } from "express";
const router = Router();

import { rutaPrincipal, postFisicas, PostRegistro_Suelos, postQuimicas, postClasification, postRegistro_Usuario2, postRegistro_Usuario1,
    postBiologicas,postBiologicasSub1, postBiologicas2, postIdUser } from "../controllers/home.controller.js";

    router.get('/',rutaPrincipal);

router.post('/postRegistro_Usuario2', postRegistro_Usuario2);
router.post('/postRegistro_Usuario1', postRegistro_Usuario1);
router.post('/postFisicas', postFisicas);
router.post('/postQuimicas', postQuimicas);
router.post('/postBiologicas', postBiologicas);
router.post('/postBiologicasSub1', postBiologicasSub1);
router.post('/postBiologicas2', postBiologicas2);
router.post('/PostRegistro_Suelos', PostRegistro_Suelos);
router.post('/postClasification', postClasification);
router.post('/login',postIdUser);

export default router;

//funcional