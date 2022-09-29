const fs = require('fs')
const http = require('http')
const path = require('path')

const HOST_NAME = 'localhost'
const PORT = 8080

const bookDBPath = path.join(__dirname, "db", 'books.json')
// let bookDB = []
console.log(bookDBPath)
const requestHandler = (req, res)=>{
    if (req.url === '/books' & req.method === 'GET'){
        // console.log('Read data')
        getAllBooks(req, res)
    } else if (req.url === '/books' & req.method === 'POST'){
        // console.log('Write on data')
        addBooks(req, res)
    } else if (req.url === '/books' & req.method === 'PUT'){
        updateBooks(req, res)
    } else if (req.url === '/books' & req.method === 'DELETE'){
        // console.log('Delete data')
        deleteBooks(req, res)
    }
}

const getAllBooks = (req, res)=>{
    fs.readFile(bookDBPath, 'utf8', (err, data)=>{
        if (err){
            console.log(err)
            res.writeHead(404)
            res.end('Error')
        }
        res.end(data)
    })
}

const addBooks = (req, res)=>{
    // read the user's entry
    const body = []
    req.on('data', (chunk)=>{
        body.push(chunk)
    })
    req.on('end', ()=>{
        const parseBody = Buffer.concat(body).toString()
        const newBook = JSON.parse(parseBody)
        // console.log(parseBody)
        fs.readFile(bookDBPath, 'utf8', (err, data)=>{
            if (err){
                console.log(err)
                res.writeHead(404)
                res.end('Error')
            }
            const oldBook = JSON.parse(data)
            const allBook = [...oldBook, newBook]
            // console.log(allBook)
    
        fs.writeFile(bookDBPath, JSON.stringify(allBook), (err)=>{
            if (err){
                console.log(err);
                res.writeHead(500);
                res.end(JSON.stringify({
                    message: 'could not save book to database'
                }));
            }
            res.end(JSON.stringify(newBook));
        })
    })
 })
}

const updateBooks = (req, res)=>{
    const body = []

    req.on('data', (chunk)=>{
        body.push(chunk)
    })
    req.on('end', ()=>{
        const parseBody = Buffer.concat(body).toString()
        const detailsToUpdate = JSON.parse(parseBody)
        const bookId = detailsToUpdate.id
        // console.log(detailsToUpdate)

        fs.readFile(bookDBPath, 'utf8', (err, books)=>{
            if (err){
                console.log(err)
                res.writeHead(404)
                res.end('Error')
            }

            const booksObj = JSON.parse(books)
            // console.log(booksObj)
            const bookIndex = booksObj.findIndex(book => book.id === bookId)
            console.log(bookIndex)

            if (bookIndex === -1){
                res.writeHead(404)
                res.end('Specified ID not found')
                return
            }

            const updatedBook = {...booksObj[bookIndex], ...detailsToUpdate}
            booksObj[bookIndex] = updatedBook
            console.log(updatedBook)
            // console.log(detailsToUpdate)
            fs.writeFile(bookDBPath, JSON.stringify(booksObj), (err)=>{
                if (err){
                    console.log(err);
                    res.writeHead(500);
                    res.end(JSON.stringify({
                        message: 'could not save book to database'
                    }));
                }
                res.writeHead(200)
                res.end('Update Successful');
            })
    })
})
}

const deleteBooks = (req, res)=>{
    // code goes here
    const body = []

    req.on('data', (chunk)=>{
        body.push(chunk)
    })
    req.on('end', ()=>{
        const parseBody = Buffer.concat(body).toString()
        const detailsToUpdate = JSON.parse(parseBody)
        const bookId = detailsToUpdate.id
        // console.log(detailsToUpdate)

        fs.readFile(bookDBPath, 'utf8', (err, books)=>{
            if (err){
                console.log(err)
                res.writeHead(404)
                res.end('Error')
            }

            const booksObj = JSON.parse(books)
            // console.log(booksObj)
            const bookIndex = booksObj.findIndex(book => book.id === bookId)
            console.log(bookIndex)

            if (bookIndex === -1){
                res.writeHead(404)
                res.end('Specified ID not found')
                return
            }
            // delete starts here
            // const updatedBook = {...booksObj[bookIndex], ...detailsToUpdate}
            // booksObj[bookIndex] = updatedBook
            // console.log(updatedBook)
            // // console.log(detailsToUpdate)
            booksObj.splice(bookIndex, 1)
            // console.log(booksObj)
            fs.writeFile(bookDBPath, JSON.stringify(booksObj), (err)=>{
                if (err){
                    console.log(err);
                    res.writeHead(500);
                    res.end(JSON.stringify({
                        message: 'could not save book to database'
                    }));
                }
                res.writeHead(200)
                res.end('Item Successfully Deleted!');
            })
    })
})
}



const server = http.createServer(requestHandler)
server.listen(PORT,HOST_NAME, ()=>{
    const bookDB = JSON.parse(fs.readFileSync(bookDBPath,"utf8"))
    console.log(`Server running on port http://${HOST_NAME}:${PORT}`)
})
