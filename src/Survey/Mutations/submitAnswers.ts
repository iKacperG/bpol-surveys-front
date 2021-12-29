import {gql} from "@apollo/client";
import unquoteJSON from "../../utils/unquoteJSON";

export default function submitAnswersMutation(userAnswers: any[]) {
    
    const SUBMIT_ANSWERS = gql`
    mutation {
      addAnswers(answerInput:{
        userAnswers: [${unquoteJSON(userAnswers).substring(1, unquoteJSON(userAnswers).length - 1)}]
      })
      {
        id
      }
    }
    `;
    
    return SUBMIT_ANSWERS;
}