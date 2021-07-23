// creo servidor
const express = require ('express');
const app = express();
/*Router */
const router = express.Router();
const PORT = 8080;
/*Body Parser */
// const bodyParser = require("body-parser");
/*Cargo módulo Handlebars */
const handlebars = require('express-handlebars');

// permite que nuestro servidor pueda interpretar de forma automatica los json
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/* cargo modulo de handlebars */
app.engine(
    'hbs',
    handlebars({
      extname: 'hbs', // Extension a utilizar
      defaultLayout: 'main.hbs', // El layout que va a cargar en todas las paginas por default
      layoutsDir: `./views/layouts`, // Donde se van a encontrar las layouts
      partialsDir: `./views/partials/` // Donde se van a encontrar los partials
    })
  );


// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// establecemos el directorio donde se encuentran los archivos de la plantilla
app.set("views", "./views");



app.use('/api', router);
// Espacio publico del servidor
app.use('/static', express.static(__dirname + '/public'));


/*Importo clase de productos*/
// const Productos = require('./productos')
const  { Productos }  = require('./productos');

/*Array que contendrá productos*/
// let listProducts = [];

/* Acá creamos la instancia de la clase */
const productos = new Productos();


// RUTAS de la API*/

router.get('/productos/listar', (req, res) => {
    res.json(productos.listAll());
});

router.get('/productos/listar/:id', (req, res) => {
    res.json(productos.list(req.params));
});

router.post('/productos/save', (req, res) => {
    // console.log(req.body)
    productos.addProduct(req.body);
    // console.log('Finalizó función')
    res.redirect('../../productos/agregar')
});

router.put('/productos/actualizar/:id', (req, res) => {
    res.json(productos.actualizar(req.body, req.params.id));
});

router.delete('/productos/delete/:id', (req, res) => {
    res.json(productos.delete(req.params.id));
})


// RUTAS VISTA
// app.get("/productos/vista", (req, res) => {
//     if (productos.length <= 0) {
//       console.log("No se encontraron productos");
//       // res.send({ error: "No hay productos cargados" });
//       const noProducts = { state: true, msg: "No hay productos cargados"}
//       res.render('productos', {noProducts})
//     } else {
//       console.log("Se encontraron productos");
//       // res.render('main', {title: 'Soy un título'})
//       res.render('productos', {productos})
//     }
//   });
  

app.get('/productos/vista', (req, res) => {
    // console.log(productos.productos)
    // console.log(productos.productos.length)
    if (productos.productos.length > 0) {
        res.render('productos', productos) 
    } else {
        const noProducts = { state: true, msg: "No hay productos cargados"}
        res.render('productos', {noProducts})
    }
});

app.get('/productos/agregar', (req, res) => {
    res.render('agregar-productos')
})



const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`))










// const app = express();
// app.use(express.json());
// const PORT = 8080;


// app.get('/api/productos', (req, res) => {
//     res.json(Products.listAll())
// });

// app.get('/api/productos/:id', (req, res) => {
//     let id = req.params.id
//     res.json(Products.list(id))
// })

// app.post('/api/productos', (req, res) => {
//     res.json(Products.save(req.body))
// })


// const server = app.listen(PORT, () => {     console.log(`Servidor http escuchando en el puerto ${server.address().port}`) }) 

// server.on("error", error => console.log(`Error en servidor ${error}`))

