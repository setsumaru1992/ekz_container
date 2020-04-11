import React, { Component } from "react";
import QueryStringParser from "~/views/features/utils/queryStringParser"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncChoiceList} from "~/reducers/choicesAppReducer";
import {actionChoiceVisibleForm} from "~/reducers/choicesViewReducer";
import ChoiceShowElem from "~/views/components/choices/show/choiceElement";
import ChoiceNew from "~/views/components/choices/new"
import Button from "react-bootstrap/es/Button";
import {Form} from "react-bootstrap"
import {NavLink} from "react-router-dom"

class ChoiceShow extends Component {

  componentWillMount() {
    const {
      location,
      actionAsyncChoiceList,
    } = this.props
    const themeId = new QueryStringParser(location).getThemeId()
    actionAsyncChoiceList(themeId)
  }

  render() {
    const {
      choiceList,
      visibleFormMap,
      actionChoiceVisibleForm,
      actionAsyncChoiceList,
      theme,
    } = this.props
    return (
      <div>
        <h1>{theme.name}</h1>
        <NavLink
          to={{
            pathname: "/mypage/ekz",
            search: `?t=${theme.id}`
          }}>ekz</NavLink>
        <Button onClick={()=>actionChoiceVisibleForm(theme.id)}>
          {visibleFormMap[`${theme.id}_`]
            ? "閉じる"
            : "クイック追加"
          }
        </Button>
        <br/>&emsp;
        {visibleFormMap[`${theme.id}_`]
          ? <ChoiceNew themeId={theme.id} />
          : ""
        }
        <input
          type="text" name="searchWord" id="searchWord"
          onInput={() => {
            const searchWord = document.getElementById("searchWord").value
            actionAsyncChoiceList(theme.id, searchWord)
          }}
        />
        <Form.Row>
          {choiceList.map((choice) =>
            <ChoiceShowElem choice={choice} themeId={theme.id} key={choice.id} />
          )}
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
      theme: state.choicesAppReducer.getTheme(),
      choiceList: state.choicesAppReducer.getChoiceList(),
      visibleFormMap: state.choicesViewReducer.visibleFormMap,
    }
  }, {actionAsyncChoiceList, actionChoiceVisibleForm}
)