const express = require('express')
const app = express()
const pool = require('./models/pool.js')
// const router = require('./movies.js')
const bodyParser = require('body-parser')
const moviesRouter = require('./controllers/moviesRouter.js')
const usersRouter = require('./controllers/usersRouter.js')

const multer = require('./multer.js')
const path = require('path')

// app.use(router)
app.use('/movies', moviesRouter);
app.use('/users', usersRouter)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.put('/contact/upload', multer().single('photo'), (req, res) => {
const file = req.file.path

console.log(file)
if(!file){
    return res.status(400).json({
        status: false,
        message: "no file selected",
    })
}
res.send(file)
}) 

// app.post("/upload/:id/photo",
//             multer({ storage: diskStorage }).single('image'),
//             (req, res) => {
//                 const file = req.file.path
//                 const {id} = req.params

//                 if(!file) {
//                     res.status(400).json({message: "No file uploaded"})
//                 } else {
//                     const query = `
//                     UPDATE movies 
//                     SET photos = $1
//                     WHERE id = $2
//                     `

//                     const imageUrl = `http://localhost:3000/contact/upload${req.file.filename}`

//                     pool.query(query, [imageUrl, id], (err, result) => {
//                         if(err) {
//                             res.status(500).json({message: err.message})
//                         } else {
//                             res.status(200).json({message: "Image uploaded"})
//                         }
//                     })

//                 }
//             }
// )

app.use("/upload", express.static(path.join(__dirname, "public/uploads")))

pool.connect((err, res)=>{
    console.log(err)
    console.log('database connected')
})

app.listen(3000)