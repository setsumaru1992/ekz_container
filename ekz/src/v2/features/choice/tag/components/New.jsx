import React from 'react';
import PropTypes from 'prop-types';
import {gql} from 'apollo-boost';
import { graphql, Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Wrapper from './Wrapper';
import tagQuery from '../models/appModels/tagQuery';

const createTagMutation = gql`
mutation ($choiceId: Int!, $name: String!){
  createTag(input:{choiceId: $choiceId, name: $name}) {
    id
  }
}
`
//
// const NewTagForm = (props) => {
//   const { choiceId, toggleFormVisible } = props;
//   return (
//
//   )
// }
//
// NewTagForm.propTypes = {
//   choiceId: PropTypes.number,
//   toggleFormVisible: PropTypes.func
// }

const New = (props) => {
  const { choiceId } = props;

  const [formVisible, setFormVisible] = React.useState(false);
  const toggleFormVisible = () => {setFormVisible(!formVisible)};

  let style = {};
  style.display = formVisible ? 'inherit' : 'none'

  return (
    <React.Fragment>
      <Wrapper>
        <span style={style}>
          {/*<NewTagForm choiceId={choiceId} toggleFormVisible={toggleFormVisible}/>*/}
          {/*graphql(createTagMutation, {name: 'createTagMutation'})(*/}
          <Mutation mutation={createTagMutation} refetchQueries={[{query: tagQuery, variables: {choiceId: choiceId}}]}>
            {(createTag,{loading}) => (
          <Formik
              initialValues={{
                name: '',
                choiceId: choiceId,
              }}
              validate={ (values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = 'Required';
                }
                return errors;
              }}
              onSubmit={async (values, { props, setSubmitting, resetForm }) => {
                // const { createTag } = props
                await createTag({variables: values})
                setSubmitting(false);
                toggleFormVisible()
                resetForm()
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field type="name" name="name" />
                  <ErrorMessage name="name" component="span" />
                  <button type="submit" disabled={isSubmitting}>
                    登録
                  </button>
                </Form>
              )}
            </Formik>
            )}
          </Mutation>
          {/*)*/}
        </span>
        { formVisible
          ? <span onClick={toggleFormVisible}>×</span>
          : <span onClick={toggleFormVisible}>+</span>}
      </Wrapper>
    </React.Fragment>
  )
}

New.propTypes = {
  choiceId: PropTypes.number,
}

export default New