import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Recipe from "./Recipe"
import styled from "styled-components";
import { OK, Error, Title } from "../style/styles";

const RECIPES_LIST_QUERY = gql`
  {
    recipes {
      title
      _id
      description
      date
    }
  }
`;

export default () => {
  const [actualRecipe, setActualRecipe] = useState("")
  const { loading, error, data: listData } = useQuery(RECIPES_LIST_QUERY);
  if (loading) return <p>Cargando lista de recetas...</p>;
  if (error) return <p>Error cargando la lista de recetas...</p>;

  return (
    <ViewRecipes>
      <Container>
      <Title>Recetas Disponibles</Title>
      {listData.recipes.map(({ _id, title }) => (
        <Recipes key={_id} onClick={() => {setActualRecipe(_id);}} >{title}</Recipes>
      ))}
      </Container>
      {actualRecipe !== "" ? <Recipe value={actualRecipe} /> : null}
    </ViewRecipes>
  );
};

const ViewRecipes = styled.div`
  color: #333333;
  margin: 2em;
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
    dysplay: flex;
    flex-direction: column;
`

const Recipes = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: column;
`;
