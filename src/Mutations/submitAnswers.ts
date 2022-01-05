import {gql} from "@apollo/client";

export const SUBMIT_ANSWERS = gql`
    mutation($userAnswers: [UserAnswer!]!) {
      addAnswers(answerInput:{
        userAnswers: $userAnswers
      })
      {
        response
      }
    }
    `;
