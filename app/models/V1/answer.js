const CoreModel = require('./coreModel');

class Answer extends CoreModel {

  #description;
  #question_id;

  constructor(obj) {
    super(obj);

    if(typeof obj.description !== 'string') {
      throw new Error("Answer.description must be a string!");
    }
    this.#description = obj.description;

    this.#question_id = obj.question_id;
  }

  get question_id() {
    return this.#question_id;
  }
  get description() {
    return this.#description;
  }

};

module.exports = Answer;