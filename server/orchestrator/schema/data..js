const axios = require("axios");
const redis = require("../config/redis");
const { baseAppUrl, baseUserUrl } = require("../url");

const AppTypeDefs = `#graphql
type User{
  _id: ID,
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
    Address: String
}
  type Genre {
      id: ID,
      name: String
  } 
  type Cast {
    id: ID,
    MovieId: Int,
    name: String,
    profilePict: String
  }
  type Movie {
     id: ID,
      title: String,
      synopsis: String,
      rating: Float,
      AuthorId: Int,
      GenreId: Int,
      imgUrl: String,
      MongoDBId: String,
      trailerUrl: String,
      Genre: Genre
      Casts: [Cast]
      user: User
  }
  input AddMovieData {
    title: String,
    synopsis: String,
    rating: Float,
    GenreId: Int,
    imgUrl: String,
    MongoDBId: String,
    trailerUrl: String,
  }
  input AddCast {
    castName: String,
    castImgUrl: String
  }
  input AddingMovieData {
    data:AddMovieData,
    cast:[AddCast]
  }
  type successAddData {
    message: String 
  }
  type successDelete {
    message: String 
  }
  type deleteData {
    message: String 
  }
  type deleteGenre {
    message: String 
  }
  type editGenreSuccess{
    message: String
  }
  type editAnimeSuccess{
    message: String
  }
  type Query {
    getAllData:[Movie],
    getOneData(id:ID!):Movie
    getAllGenre:[Genre]
    getOneGenre(id:ID!):Genre
  }
  type Mutation {
    addAnime(
      addData: AddingMovieData
   ): successAddData
   addGenre( name: String) : successDelete
   deleteAnime(id:ID!): deleteData
   deleteGenre(id:ID!): deleteGenre
   editGenre(id:ID!, name:String) : editGenreSuccess
   editAnime(id:ID!, editData:AddMovieData) :editAnimeSuccess
  }
  
  `;

const AppResolvers = {
  Query: {
    getAllData: async () => {
      try {
        const allData = await redis.get("app:allData");
        if (allData) {
          const data = JSON.parse(allData);
          console.log("ini di redis");
          return data;
        } else {
          const { data } = await axios.get(baseAppUrl + `/private/anime`);
          console.log("ini dari else");
          await redis.set("app:allData", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getOneData: async (parent, args) => {
      try {
        console.log(args);
        const OneData = await redis.get(`app:OneData/${args.id}`);
        if (OneData) {
          const data = JSON.parse(OneData);
          console.log("ini di redis");
          return data;
        } else {
          const { data } = await axios.get(
            baseAppUrl + `/private/anime/${args.id}`
          );
          let userId = data.MongoDBId;
          const response = await axios.get(baseUserUrl + `/${userId}`);
          data.user = response.data;
          console.log("ini dari else");
          await redis.set(`app:OneData/${args.id}`, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getAllGenre: async () => {
      try {
        const allGenre = await redis.get("app:allGenre");
        if (allGenre) {
          const genre = JSON.parse(allGenre);
          console.log("ini di redis");
          return genre;
        } else {
          const { data } = await axios.get(baseAppUrl + `/private/genre`);
          console.log("ini dari else");
          await redis.set("app:allGenre", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getOneGenre: async (parent, args) => {
      try {
        const OneGenre = await redis.get(`app:OneGenre/${args.id}`);
        if (OneGenre) {
          const genre = JSON.parse(OneGenre);
          console.log("ini di redis");
          return genre;
        } else {
          const { data } = await axios.get(
            baseAppUrl + `/private/genre/${args.id}`
          );
          console.log("ini dari else");
          await redis.set(`app:OneGenre/${args.id}`, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addAnime: async (parent, args) => {
      try {
        let { data, cast } = args.addData;
        const response = await axios.post(baseAppUrl + `/private/data`, {
          data,
          cast,
        });
        console.log(response)
        await redis.del("app:allData");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    addGenre: async (parent, args) => {
      try {
        const response = await axios.post(baseAppUrl + `/private/genre`, args);
        await redis.del("app:allGenre");
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteAnime: async (parent, args) => {
      try {
        const response = await axios.delete(
          baseAppUrl + `/private/anime/${args.id}`
        );
        await redis.del("app:allData");
        await redis.del(`app:OneData/${args.id}`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteGenre: async (parent, args) => {
      try {
        const response = await axios.delete(
          baseAppUrl + `/private/genre/${args.id}`
        );
        await redis.del("app:allGenre");
        await redis.del(`app:OneGenre/${args.id}`);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    editGenre: async (_, args) => {
      try {
        const { data } = await axios.put(
          baseAppUrl + `/private/genre/${args.id}`,
          {
            name: args.name,
          }
        );
        await redis.del("app:allGenre");
        await redis.del(`app:OneGenre/${args.id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    editAnime: async (_, args) => {
      try {
        let { editData, id } = args;
        const { data } = await axios.put(
          baseAppUrl + `/private/anime/${id}`,
          editData
        );
        await redis.del("app:allData");
        await redis.del(`app:OneData/${args.id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  AppTypeDefs,
  AppResolvers,
};
