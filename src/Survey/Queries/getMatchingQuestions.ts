import {gql} from "@apollo/client";

export default function getMatchingQuestions(id: string | undefined) {
    return GET_MATCHING_QUESTIONS = gql`
    query {
      findQuestions(id: "${id}") {
        id
        text
        inputType
      }
    }
    `;

    return GET_MATCHING_QUESTIONS;
}