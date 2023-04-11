import  express, { urlencoded }  from "express";
import { PORT } from "./config.js";
import {fileURLToPath} from 'url'
import { dirname,join } from "path"; //para unir directorios
import morgan from "morgan";
import userRouter from './routes/usuario.routes.js'

//config de express
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//vistas con ejs:
//ruta absoluta
const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('views', join(__dirname,'views'))
app.set('view engine', 'ejs') 

//rutas
app.use('/', userRouter)

//mandamos las vistas al server/fronted
app.use(express.static(join(__dirname,'public')))

//morgan
app.use(morgan('dev')); //para ver los registro del server por la consola


//404
app.use((req,res,next)=>{
    res.status(404).send('Oops, page not found')
})    

//arranque
const arranque = ()=>{
    app.listen(PORT, ()=>{
        console.log(`Servidor levantado en el puerto ${PORT}`)
    })

}

arranque();