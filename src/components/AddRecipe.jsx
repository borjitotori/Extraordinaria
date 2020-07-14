import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { sessionState } from "../recoil/atoms";
import { OK, Error, Title } from "../style/styles";

import UploadFile from "./UploadFile";

const ADD_RECIPE = gql`
  mutation addRecipe($userID: ID!, $token: String!, $title:String!, $description: String!, $steps: [StepInput!]!, $ingredients: [ID!]!, $mainImage: FileInput!) {
    addRecipe(userID: $userID, token: $token, title: $title, description: $description, steps: $steps, ingredients: $ingredients, mainImage: $mainImage ) {
      title
    }
  }
`; 

const RECIPE_LIST = gql`{

  recipes{
    _id
    title
    description
    date
    author
    mainImage{
      url
      mimetype
      encoding
    }
    steps{
      description
      image{
        url
        mimetype
        encoding
      }
    }
  }
}
`

export default () => {
  const [session] = useRecoilState(sessionState)
  const [addRecipe, { data, error }] = useMutation(
    ADD_RECIPE,
    {
      update(cache, { data: { addRecipe } }) {
        const { recipes } = cache.readQuery({
          query: RECIPE_LIST,
        });
        cache.writeQuery({
          query: RECIPE_LIST,
          data: { recipes: recipes.concat([addRecipe]) },
        });
      },
      onError(error) {
        if (error.message.includes("duplicate key")) {
          console.error("Error: Dupulicated Key");
        } else if (error.message.includes("Cast to ObjectId")) {
          console.log("Usuario no loggeado");
        } else {
          console.log(
            "Ha ocurrido un error inesperado, vuelve a intentarlo más tarde",
          );
        }
      },
    },
  );


  //Faltaria la introduccion de los parametros por base de inputs asi como el introducir un chequeo de los ingredientes
  //comprobando si estan en la lista o no.
  return (
    <div>
      <UploadFile />
    </div>
  );
};
