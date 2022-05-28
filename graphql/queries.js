import { gql } from "graphql-request";

export const GET_ALL_POSTS = gql`
  {
    posts {
      id
      title
      summary
      content {
        html
      }
      published_at
      slug
    }
  }
`;
