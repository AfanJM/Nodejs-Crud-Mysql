import { pool } from "../db.js";
import {validationResult} from 'express-validator'


//GetALL
export const userGet = async(req,res)=>{ 
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios ')
        res.render('usuarios',{usuarios:rows})
    
    
    } catch (error) {

        res.status(400).json({
            errorMessage:'Peticion invalida'
        })
    }   
}

//get:crear usuario
export const getCrear = (req,res)=>{
    res.render('crearUsuario.ejs')
}


//Crear usuario
export const userPost =async(req,res)=>{
    
    //validacion
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).json({errors:errors.array()})
    const {nombre,email,telefono} = req.body;

      try{
    const [rows] = await pool.query('INSERT INTO usuarios (nombre,email,telefono) VALUES (?,?,?)',
    [nombre,email,telefono])
  
    res.redirect('/')
    //res.render('crearUsuario')


    } catch (error) {
       res.status(400).json({
        message:'La peticion es invalida'
       })   
    }  
}

//eliminar
export const userDelete = async(req,res)=>{
    
    try {

         const [result] = await pool.query('DELETE FROM usuarios WHERE id=?', [req.params.id])
    
        if(result.affectedRows.length <= 0) return res.status(404).json({
            errorMessage:'El usuario no se encontro'
        })

        res.redirect('/')
    } catch (error) {
        res.status(400).json({
            errorMessage:'Error al eliminar el usuario'
        })
    }
}

//get para actualizar
export const getUpdate = async(req,res)=>{
    const{id} = req.params;
    
    try {
        const [result] = await pool.query('SELECT * FROM usuarios WHERE id=? ', [id])
        res.render('editarUsuario', {usuarios:result[0]})
        
    } catch (error) {
        res.status(400).json({errorMessage:'Esta id no existe'})
    }

}

//post para actualizar
export const userUpdate = async(req,res)=>{
    const {id} = req.params;
    const {nombre,email,telefono} = req.body;
    try {
        const [result] = await pool.query('UPDATE usuarios SET nombre=IFNULL(?,nombre), email=IFNULL(?,email), telefono=IFNULL(?,telefono) WHERE id=?',
        [nombre,email,telefono,id])
        res.redirect('/')

    } catch (error) {
        res.status(400).json({errorMessage:'Error al actualizar este usuario'})
    }
}