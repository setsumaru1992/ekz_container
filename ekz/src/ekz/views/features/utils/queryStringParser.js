export default class QueryStringParser{
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