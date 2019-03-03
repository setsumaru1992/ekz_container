import React, { Component } from 'react';
import QueryStringParser from "~/views/features/utils/queryStringParser"
import {connectViewToStateAndActionCreaters} from '~/views/features/utils/connectorViewToOther'
import {actionAsyncChoiceList, actionAsyncEkzList} from '~/reducers/choicesAppReducer';
import {actionChoiceVisibleForm} from '~/reducers/choicesViewReducer';
import ChoiceShowElem from '~/views/components/choices/show/choiceElement';
import ChoiceNew from '~/views/components/choices/new'
import Button from "react-bootstrap/es/Button";
import {Form} from "react-bootstrap"

class ChoiceShow extends Component {

  componentWillMount() {
    const {
      location,
      actionAsyncEkzList,
      actionAsyncChoiceList,
    } = this.props
    this.themeId = new QueryStringParser(location).getThemeId()
    actionAsyncChoiceList(this.themeId)
    actionAsyncEkzList(this.themeId)
  }

  render() {
    const {
      ekzListMap,
      choiceListMap,
      visibleFormMap,
      actionChoiceVisibleForm,
      actionAsyncEkzList,
    } = this.props
    const ekzList = ekzListMap[this.themeId] ? ekzListMap[this.themeId].ekzList: undefined
    const choiceList = choiceListMap[this.themeId] ? choiceListMap[this.themeId].choiceList: undefined
    const themeName = choiceListMap[this.themeId] ? choiceListMap[this.themeId].themeInfo.name: undefined
    return (
      <div>
        <h1>{themeName}</h1>
        <Button onClick={() => actionAsyncEkzList(this.themeId)}>選び直す</Button>
        <Form.Row>
          {ekzList ? ekzList.map((choice) =>
            <ChoiceShowElem choice={choice} themeId={this.themeId} key={choice.id} />
          ) : null}
        </Form.Row>

        <h2>全リスト</h2>
        <Button onClick={()=>actionChoiceVisibleForm(this.themeId)}>
          {visibleFormMap[`${this.themeId}_`]
            ? "閉じる"
            : "クイック追加"
          }
        </Button>
        <br/>&emsp;
        {visibleFormMap[`${this.themeId}_`]
          ? <ChoiceNew themeId={this.themeId} />
          : ""
        }
        <Form.Row>
          {choiceList ? choiceList.map((choice) =>
            <ChoiceShowElem choice={choice} themeId={this.themeId} key={choice.id} />
          ) : null}
        </Form.Row>
      </div>
    )
  }
}

ChoiceShow.propTypes = {
}

export default connectViewToStateAndActionCreaters(ChoiceShow,
  (state) => {
    return {
      choiceListMap: state.choicesAppReducer.choiceListMap,
      ekzListMap: state.choicesAppReducer.ekzListMap,
      visibleFormMap: state.choicesViewReducer.visibleFormMap,
    }
  }, {actionAsyncChoiceList, actionAsyncEkzList, actionChoiceVisibleForm}
)