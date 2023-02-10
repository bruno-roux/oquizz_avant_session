const PersonFactory = {
    createPerson: (firstName, lastName, age) => {
        let newPerson = {};
        newPerson.firstName = firstName;
        newPerson.lastName= lastName;
        newPerson.age = age;

        newPerson.hello = () => {
            console.log(`Hello my name is ${newPerson.firstName} ${newPerson.lastName}, I'm ${newPerson.age} years old`);
        }

        return newPerson;
    }
};

const paul = PersonFactory.createPerson('Paul', 'Marchand', 45);
const teo = PersonFactory.createPerson('Teo', 'Leloup', 24);

teo.hello();