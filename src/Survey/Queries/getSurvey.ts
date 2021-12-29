import {gql} from "@apollo/client";

export default function getSurvey(id: string | undefined) {
    const GET_SURVEY = gql`
   query {
    getSurvey(id: "${id}") {
    id
    name
  }
}
    `;

    return GET_SURVEY;
}