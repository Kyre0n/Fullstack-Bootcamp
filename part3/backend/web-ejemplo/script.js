console.log('Hola mundo!')

let firstName = 'Samuel'
console.log('Mi nombre es ' + firstName)

const list = []
const anotherList = list.concat(157)
console.log(anotherList)

const persona = {
    name: 'Samuel',
    age: 34,
    isDeveloper: true,
    links: ['http://twitter.com/samuel', 'https://twitch.tv/samuel']
}

console.log(persona.name)
persona.age = 35
console.log(persona.age)
console.log(persona.links[0])
console.log(persona.links[1])

const field = 'isDeveloper'
console.log(persona[field])

const sumar = (operando1, operando2) => {
    console.log(operando1)
    console.log(operando2)
    return operando1 + operando2
}

const a = 5
const b = 10
console.log(sumar(a, b))

function restar (operando1, operando2) {
    return operando1 - operando2
}

console.log(restar(10, 5))