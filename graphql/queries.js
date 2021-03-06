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
      slug
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
        slug
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

export const GET_POSTS_BY_TAG = gql`
  query ($slug: String!) {
    posts(where: { tags_some: { slug: $slug } }) {
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

export const GET_ALL_TAG_SLUGS = gql`
  {
    tags {
      slug
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = gql`
  query ($slug: String!) {
    posts(where: { category: { slug: $slug } }) {
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

export const GET_ALL_CATEGORY_SLUGS = gql`
  {
    categories {
      slug
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query ($first: Int, $orderBy: TagOrderByInput) {
    tags(first: $first, orderBy: $orderBy) {
      id
      title
      slug
    }
  }
`;
