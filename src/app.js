const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Cotações',
        author: 'Alex Alves'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Sobre',
        author: 'Alex Alves'
   })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Ajuda',
        author: 'Alex Alves'
    })
})

app.get('/cotacoes', (req, res) => {
    
    if(!req.query.ativo){
        return res.status(400).json({
            message: 'O ativo deve ser informado'
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body)=>{
        if(err){
            const{message} = err
            return res.status(err.code).json({message})
        }     
        res.status(200).json(body)
    })

    
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage : '404',
        author: 'Alex Alves'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})