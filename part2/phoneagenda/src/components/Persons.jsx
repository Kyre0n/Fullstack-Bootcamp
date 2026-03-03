import Person from './Person'
const Persons = ({persons, newFilter, removePerson}) => {
    return (
        <div>
            {persons
                .filter(person => 
                    person.name.toLowerCase().includes(newFilter.toLowerCase())
                )
                .map(person => 
                    <Person key={person.name} person={person} removePerson={removePerson} />
                )
            }
        </div>
    )
}
export default Persons