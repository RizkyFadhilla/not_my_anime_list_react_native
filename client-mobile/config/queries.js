import { gql } from "@apollo/client";

export const FetchAnime = gql`
  query GetAllData {
    getAllData {
      id
      title
      synopsis
      rating
      AuthorId
      GenreId
      imgUrl
      MongoDBId
      trailerUrl
      Genre {
        name
      }
      Casts {
        name
        profilePict
      }
    }
  }
`;

export const FetchOneAnime = gql`
  query Query($getOneDataId: ID!) {
    getOneData(id: $getOneDataId) {
      id
      title
      synopsis
      rating
      AuthorId
      GenreId
      imgUrl
      trailerUrl
      MongoDBId
      Genre {
        name
      }
      Casts {
        name
        profilePict
      }
      user {
        username
        email
        password
        role
        Address
        phoneNumber
        _id
      }
    }
  }
`;

export const GetAllGenre = gql`
  query GetAllGenre {
    getAllGenre {
      name
    }
  }
`;
