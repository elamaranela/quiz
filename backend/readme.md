# sample data for insert DB


# post
 * localhost:4000/api/v1/quiz

* payload:

{"topicName":"c++",
  "topicId": "1",
  "questionName": "question 1",
  "options":{"A":"options6",
  "B":"option2",
  "C":"option3",
  "D":"option4"},
  "answer":["A","D"]
}

# get the random question 
 * localhost:4000/api/v1/quiz/1
 1 is topic