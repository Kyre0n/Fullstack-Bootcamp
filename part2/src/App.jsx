import './index.css'
import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
    })
  }, [])

  /*                          Esta función es la misma que el useEffect de arriba pero separado en una función para ver más claramente que pide dos argumentos, una función y un array de dependencias
  const hook = () => {                      
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
*/

/*                            Esta es otra forma de escribir lo mismo pero haciendo una funcion para el event handler para ver más claramente que es cada cosa, aunque es un poco más larga que la anterior
useEffect(() => {
  console.log('effect')

  const eventHandler = response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)
}, [])
*/

  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    //const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    
    /*
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data))                //Toda la parte del then en concreto es para visualizar correctamente nosotros el cambio que hemos hecho
    */
    })    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)// === true) No hace falta añadir la comparación porque es redundante

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App