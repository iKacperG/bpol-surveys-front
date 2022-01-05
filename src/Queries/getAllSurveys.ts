import {gql} from "@apollo/client";

export const GET_ALL_SURVEYS = gql`
      query {
      getAllSurveys {
        id
        name
    }
}   
`;
