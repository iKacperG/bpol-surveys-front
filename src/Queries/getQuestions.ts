import {gql} from "@apollo/client";

export const GET_QUESTIONS = gql`
   query ($surveyId: String!) {
    findQuestions(id: $surveyId) {
      id
      text
      inputType
    }
  }
`;
