import {gql} from "@apollo/client";


export const GET_ANSWERS = gql`
   query ($questionId: String!) {
    findAnswers(id: $questionId) {
      id
      input
    }
  }
`;
