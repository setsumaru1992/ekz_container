import React, { createRef } from "react";
import { Field } from "redux-form";
import formCreator from "~/views/components/common/form/formCreator";
import {
  inputField,
  textareaField,
  inputFileField,
} from "~/views/components/common/form/formComponents";
import { choiceEvaluationField } from "~/views/components/choices/choiceEvaluationField";
import { Col, Form, Button } from "react-bootstrap";
import Dropzone, { useDropzone } from "react-dropzone";

const choiceValidation = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "必須項目です";
  }
  return errors;
};

const choiceFormCreator = (themeId = null, choiceId = null) => {
  let formName = "choiceForm";
  if (themeId != null) formName = `${formName}_${String(themeId)}`;
  if (choiceId != null) formName = `${formName}_${String(choiceId)}`;
  let buttonTagName = "evaluation";
  if (choiceId != null) formName = `${buttonTagName}_${String(choiceId)}`;

  // NOTE D&Dでファイルアップロードをしようと思ったけど、保留にしたのでコメントアウト

  // const imageTagId = "imageTagId"
  // const dropFileHandler = (files) => {
  //   // this.setState({files})
  //   window.alert(files[0].name)
  // }
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  // const files = acceptedFiles.map(file => (
  //   <li>{file.path}</li>
  // ));
  // const files = this.state.files.map(file => (
  //   <li key={file.name}>
  //     {file.name} - {file.size} bytes
  //   </li>
  // ));

  const choiceForm = formCreator(
    formName,
    (handleSubmit, pristine, reset, submitting) => {
      return (
        <Form onSubmit={handleSubmit} action="#">
          <Field
            component={inputField}
            type="text"
            name="name"
            label="チョイス名"
          />
          <Field component={inputField} type="url" name="url" label="URL" />
          <Field component={textareaField} name="description" label="説明" />
          <Field component={choiceEvaluationField} name="evaluation" />
          <Field
            component={inputFileField}
            name="image"
            // id={imageTagId}
            label="画像"
          />
          {/*<Dropzone onDrop={dropFileHandler}>*/}
          {/*{({getRootProps, getInputProps}) => (*/}
          {/*<section className="container">*/}
          {/*<div {...getRootProps({className: 'dropzone'})}>*/}
          {/*<input {...getInputProps()} />*/}
          {/*<p>Drag 'n' drop some files here, or click to select files</p>*/}
          {/*</div>*/}
          {/*<aside>*/}
          {/*<h4>Files</h4>*/}
          {/*/!*<ul>{files}</ul>*!/*/}
          {/*</aside>*/}
          {/*</section>*/}
          {/*)}*/}
          {/*</Dropzone>*/}
          <Form.Group>
            <Col smoffset={2} sm={5}>
              <Button
                variant={"outline-primary"}
                type="submit"
                disabled={pristine || submitting}
              >
                登録
              </Button>
              <Button
                variant={"outline-secondary"}
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                クリア
              </Button>
            </Col>
          </Form.Group>
        </Form>
      );
    },
    choiceValidation
  );
  return choiceForm;
};
export default choiceFormCreator;
