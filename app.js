const express = require('express')
const path = require('path');
const app = express()
const fs = require('fs')


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public", )))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes


// Create a new file
app.get('/create',(req,res)=>{
    const date = new Date();
    const day = String(date.getDate()).padStart(2, 0);
    const month = String(date.getMonth() + 1).padStart(2, 0); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const fn =`${day}-${month}-${year}.txt`;

     fs.writeFile(`./files/${fn}`,"daal cheeni",(err)=>{
        if(err) return res.send("something went wrong")
        else res.send("done")
     })
})

/// Read files 

app.get('/',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        console.log(files);
        res.render("index",{files})
    })
})




// Edit files 

app.get('/edit/:filename',(req,res)=>{

    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        if(err) return res.send(err)
        res.render("edit",{data,filename:req.params.filename})
    })

})
app.post('/update/:filename',(req,res)=>{

    fs.writeFile(`./files/${req.params.filename}`,`${req.body.filedata}`,(err)=>{
        if(err) return res.send(err)

        res.redirect('/')
    })

})



// for delete files 

app.get('/delete/:filename',(req,res)=>{

    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        if(err) return res.send(err)
            
        res.redirect('/')
    })
})

app.post()

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})