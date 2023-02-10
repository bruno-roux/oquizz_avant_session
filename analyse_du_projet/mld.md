niveau(id, nom)

reponse(id, description, question_id)

question(id, description, anecdote, wiki, #quizz_id, #niveau_id, #reponse_id)

user(id, prenom, nom, email, password)

tag(id, nom)

quizz(id, nom, description, #user_id)


quizz_tag(id, #quizz_id, #tag_id)


reponse HAS (#question_id)