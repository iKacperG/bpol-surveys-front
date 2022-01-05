import {gql} from "@apollo/client";

export const GET_SURVEY = gql`
   query($id: String!) {
    getSurvey(id: $id) {
    id
    name
  }
}
`;
