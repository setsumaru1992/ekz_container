import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Wrapper from './Wrapper';
import { TAG_QUERY } from '../models/queries';
import { CREATE_TAG_MUTATION } from '../models/mutations';

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
          <Mutation mutation={CREATE_TAG_MUTATION} refetchQueries={[{query: TAG_QUERY, variables: {choiceId: choiceId}}]}>
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