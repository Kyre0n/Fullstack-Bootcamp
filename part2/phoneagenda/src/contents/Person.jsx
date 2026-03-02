

const Person = ({person, removePerson}) => <p>{person.name} {person.number} <button onClick={() => removePerson(person.id)} >Remove</button></p>

export default Person