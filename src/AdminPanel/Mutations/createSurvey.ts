import {gql} from "@apollo/client";

export default function createSurveyMutation(title: string, questions: string[]) {
    const CREATE_SURVEY = gql`
    mutation {
      createSurvey(surveyInput:{
        name: "${title}"
        questions: ["${questions.join('", "')}"]
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
    
    return CREATE_SURVEY;
}