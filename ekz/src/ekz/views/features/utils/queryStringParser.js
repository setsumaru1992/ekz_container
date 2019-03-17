export default class QueryStringParser{
  /*
  なぜlocationにsearchが入っているかは以下にメモ
  ekz/src/ekz/views/features/utils/connectorViewToOther.js
   */
  constructor(routerLocation) {

    this.queryParams = new URLSearchParams(routerLocation.search)
  }

  getThemeId(){
    const themeId = this.queryParams.get(paramNameMap.themeId)
    return Number(themeId)
  }
}

const paramNameMap = {
  themeId: "t",
  choiceId: "c",
}