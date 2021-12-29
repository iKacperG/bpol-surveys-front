import {gql} from "@apollo/client";

export default function getMatchingQuestions(id: string | undefined) {
    const GET_MATCHING_QUESTIONS = gql`
    query {
      findMatching(id: "${id}") {
        id
        text
      }
    }
    `;

    return GET_MATCHING_QUESTIONS;
}