import { Router } from "express";
import { userPost, userGet, userDelete, getCrear,getUpdate,userUpdate } from "../controller/usuario.controller.js";
import { userValidation } from "../validate/usuario.validator.js";
const router = Router();


//get
router.get('/', userGet)

//get crear usuario
router.get('/crearUsuario', getCrear)

//post definitivo
router.post('/add',userValidation,userPost )

//delete
router.get('/delete/:id', userDelete)

//get para actualizar
router.get('/update/:id', getUpdate)

//actualizar definitivo
router.post('/update/:id',userUpdate)

export default router;