import express from 'express'

const app = express()
const port = 3000

app.use(express.json())


// CRUD OPERATIONS

// initialization
let teaData = []
let nextId = 1


//add a new tea
app.post('/teas',(req,res)=>{
    const {name,price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea);
    res.status(201).send(newTea)   
})

// get all teas
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

// get a tea with some id
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id == parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(tea);
})


//update tea
 app.put('/teas/:id', (req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
 })
 //this is call businees logic


 //delete tea
app.delete('teas/:id', (req,res)=>{
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('tea not found')
    }
    teaData.splice(index,1); // similarly we can use many functions to delete once it is not -1 and based on the index 
    return res.status(204).send(`tea has been deleted`)
})


app.listen(port,()=>{
    console.log(`Server is running at port : ${port}...`)
})
