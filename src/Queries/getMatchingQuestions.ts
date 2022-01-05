import {gql} from "@apollo/client";

export const GET_MATCHING_QUESTIONS = gql`
    query($id: String!) {
      findQuestions(id: $id) {
        id
        text
        inputType
      }
    }
`;
