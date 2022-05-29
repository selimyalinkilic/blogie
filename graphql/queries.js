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

export const GET_ALL_CATEGORIES = gql`
  {
    categories {
      id
      title
    }
  }
`;

export const GET_SINGLE_POST = gql`
  query ($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      published_at
      tags {
        id
        title
      }
      content {
        html
      }
      thumbnail {
        id
        url
      }
    }
  }
`;

export const GET_ALL_SLUGS = gql`
  {
    posts {
      slug
    }
  }
`;
