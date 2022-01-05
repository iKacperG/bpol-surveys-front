import {gql} from "@apollo/client";

    export const CREATE_SURVEY = gql`
    mutation($title: String!, $questions: [UserQuestion!]!) {
      createSurvey(surveyInput:{
        name: $title
        questions: $questions
      }) {
        id
        name
        questions {
          id
          text
        }
        url
      }
    }
    `;