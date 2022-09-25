import { gql } from 'apollo-boost';

export const CREATE_TAG_MUTATION = gql`
mutation ($choiceId: Int!, $name: String!){
  createTag(input:{choiceId: $choiceId, name: $name}) {
    id
  }
}`

export const DELETE_TAG_MUTAION = gql`
mutation ($id: Int!){
  deleteTag(input:{id: $id}) {
    id
  }
}`