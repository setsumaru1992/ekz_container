import React, { Component } from "react";
import QueryStringParser from "~/views/features/utils/queryStringParser"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncEkzList} from "~/reducers/ekzAppReducer";
import {actionChoiceVisibleForm} from "~/reducers/choicesViewReducer";
import ChoiceShowElem from "~/views/components/choices/ekz/ekzElement";
import ChoiceNew from "~/views/components/choices/new"
import Button from "react-bootstrap/es/Button";
import {Form, Table} from "react-bootstrap"
import {NavLink} from "react-router-dom";

class ChoiceEkz extends Component {

  componentWillMount() {
    const {
      location,
      actionAsyncEkzList,
      actionAsyncChoiceList,
    } = this.props
    const themeId = new QueryStringParser(location).getThemeId()
    actionAsyncEkzList(themeId)
  }

  render() {
    const {
      ekzList,
      actionAsyncEkzList,
      theme,
      visibleFormMap,
      actionChoiceVisibleForm,
    } = this.props
    return (
      <div>
        <div style={{display: "flex"}}>
          <div style={{display: "-webkit-inline-box"}}>
            <h2 style={{
              fontSize: "18px",
            }}>{theme.name}</h2>
            <Button onClick={() => actionAsyncEkzList(theme.id)}>選び直す</Button>
          </div>
          <div style={{marginLeft: "auto"}}>
            <NavLink
              to={{
                pathname: "/mypage/choice",
                search: `?t=${theme.id}`
              }}>全リスト</NavLink>
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
          </div>
        </div>
        <Form.Row>
          {ekzList.map((choice) =>
            <ChoiceShowElem choice={choice} themeId={theme.id} key={choice.id} />
          )}
        </Form.Row>
      </div>
    )
  }
}

ChoiceEkz.propTypes = {
}

export default connectViewToStateAndActionCreaters(ChoiceEkz,
  (state) => {
    return {
      theme: state.ekzAppReducer.getTheme(),
      ekzList: state.ekzAppReducer.getEkzList(),
      visibleFormMap: state.choicesViewReducer.visibleFormMap,
    }
  }, {actionAsyncEkzList, actionChoiceVisibleForm}
)