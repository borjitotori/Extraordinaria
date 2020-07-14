import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { OK, Error, Title } from "../style/styles";

const RECIPE_BIG = gql`
    query recipe($id: ID!){
        recipe(id:$id){
            title
            description
            date
            mainImage{
                url
            }
            ingredients{
                _id
                name
            }
            steps{
                description
                image{
                    url
                }
            }
        }
    }
`
export default (props) => {
  const uri = `http://77.228.91.193/`
  const { loading, error, data } = useQuery(RECIPE_BIG,{
      variables: {id: props.value}
  });
  if (loading) return <p>Cargando receta...</p>;
  if (error) return <p>Error cargando la receta...</p>;
  console.log(uri+JSON.stringify(data.recipe.mainImage.url))

  return (
    <BigRecipe>
        <Title>{data.recipe.title}</Title>
        {data.recipe.date} 
        <Container>
                <Image src={uri+data.recipe.mainImage.url.toString()} alt="recipe main"/>
                <Description>{data.recipe.description}</Description>
        </Container>
        <IngredientsList>
            {data.recipe.ingredients.map(({ _id, name }) => (
            <Ingredient key={_id}>{name}</Ingredient>
            ))}
        </IngredientsList>
        <Steps>
            {data.recipe.steps.map(({ description, image }) => (
            <Step key={image.url}>
                <SmallImage src={uri+image.url.toString()} alt="step img"/>
                {description}
            </Step>
            ))}
        </Steps>
    </BigRecipe>
  );
};

const ViewRecipes = styled.div`
  color: #333333;
  margin: 2em;
  display: flex;
  flex-direction: row;
`;

const Steps = styled.div`
    color: #333333;
    margin: 2em;
    display: flex;
    flex-direction: column;
    align-self: flex-end;
`

const Step = styled.div`
  margin-left: 1em;
`;

const Image = styled.img`
    heigth: 400px;
    width: 400px;
    object-fit: cover;
`

const SmallImage = styled.img`
    heigth: 100px;
    width: 100px;
    object-fit: cover;
`

const BigRecipe = styled.div`
    dysplay: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
`
const Description = styled.div`
    dysplay: flex;
    flex-direction: row;
`

const Container = styled.div`
    dysplay: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Recipes = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: column;
`;

const IngredientsList = styled.div`
  color: #333333;
  margin: 2em;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
`;

const Ingredient = styled.div`
  margin-left: 1em;
`;
