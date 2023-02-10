

const Tag = require('./app/models/V2/tag');
const User = require('./app/models/V2/user');
const Quiz = require('./app/models/V2/quiz');


async function test() {

    const users = await User.findAll();
    console.log(users);


    const quizzesResults = await Quiz.findAll();
    console.log(quizzesResults);

    const newTag = new Tag({name: 'Geographie'});
    const res = await newTag.insert();

    const tagsResult = await Tag.findAll();
    console.log(tagsResult);

}

test();