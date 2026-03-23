const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://samu21578_db_user:${password}@cluster0.rgcajfr.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)


const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/*        Toda esta parte es para crear un nuevo modelo de datos, en este caso una nota, y guardarla en la base de datos.
const note = new Note({
  content: 'Mongoose makes things easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})