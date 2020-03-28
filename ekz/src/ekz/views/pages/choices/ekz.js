import React, { Component, Fragment } from "react";
import QueryStringParser from "~/views/features/utils/queryStringParser"
import {connectViewToStateAndActionCreaters} from "~/views/features/utils/connectorViewToOther"
import {actionAsyncEkzList} from "~/reducers/ekzAppReducer";
import {actionChoiceVisibleForm} from "~/reducers/choicesViewReducer";
import EkzElem from "~/views/components/choices/ekz/ekzElement";
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

    const switchAreaWidth = "20px"

    return (
      <Fragment>
        {this.themeContainer(theme, visibleFormMap, actionChoiceVisibleForm)}
        <div style={{position: "relative"}}>
          {this.switchEkzAreaContainer(switchAreaWidth, theme.id, actionAsyncEkzList)}
          <div style={{margin: `0px ${switchAreaWidth}`}}>
            {ekzList.map((choice) =>
              <EkzElem choice={choice} themeId={theme.id} key={choice.id} />
            )}
          </div>
        </div>
      </Fragment>
    )
  }

  switchEkzAreaContainer(switchAreaWidth, themeId, actionAsyncEkzList){
    const switchAreaBaseStyle = {
      width: switchAreaWidth,
      height: "100%",
      position: "absolute",

    }
    const leftSwitchAreaStyle = Object.assign({left: "0px"}, switchAreaBaseStyle)
    const rightSwitchAreaStyle = Object.assign({right: "0px"}, switchAreaBaseStyle)
    const textStyle = {
      textAlign: "center",
      height: "100%",
      position: "absolute",
      transform: "translateY(50%)", // https://saruwakakun.com/html-css/basic/centering
    }

    return(
      <Fragment>
        <a href="#" style={leftSwitchAreaStyle} onClick={() => actionAsyncEkzList(themeId)}><i style={textStyle} className="fas fa-chevron-left"></i></a>
        <a href="#" style={rightSwitchAreaStyle} onClick={() => actionAsyncEkzList(themeId)}><i style={textStyle} className="fas fa-chevron-right"></i></a>
      </Fragment>
    )
  }

  themeContainer(theme, visibleFormMap, actionChoiceVisibleForm) {
    let containerStyle = {display: "flex", height: "2rem"}
    // TODO この暫定対応が消せるように吹き出しで新規追加できる(フォーム出現により高さを気にしなくていい)ようにする
    if(visibleFormMap[`${theme.id}_`]) containerStyle["height"] = "initial"
    return (
      <div style={containerStyle}>
        <div style={{display: "flex"}}>
          {this.themeNameArea(theme)}
        </div>
        <div style={{
          display: "flex",
          marginLeft: "auto"
        }}>
          {this.newChoiceCreateAreaIntoThisTheme(theme, visibleFormMap, actionChoiceVisibleForm)}
        </div>
      </div>
    )
  }

  themeNameArea(theme){
    return (
      <div style={{
        display: "-webkit-inline-box",
        fontSize: "1rem",
      }}>
        <h2 style={{
          fontSize: "1rem",
          height: "1rem",
          lineHeight: "initial"
        }}>
          &gt;{theme.name}
        </h2>
        <NavLink
          to={{
            pathname: "/mypage/choice",
            search: `?t=${theme.id}`
          }}> (リストを表示)</NavLink>
      </div>
    )
  }

  newChoiceCreateAreaIntoThisTheme(theme, visibleFormMap, actionChoiceVisibleForm){
    return (
      <div>
        <div onClick={()=>actionChoiceVisibleForm(theme.id)}>
          <i className="fas fa-edit"></i>新規追加
        </div><br/><br/>&emsp;
        {visibleFormMap[`${theme.id}_`]
          ? <ChoiceNew themeId={theme.id} />
          : null
        }
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



