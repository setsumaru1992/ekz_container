# ディレクトリ構成
## ~202003
- common
  - 共通のものの置き場。Utilityや基底クラスや処理
- models
  - 動的に変化するデータの入れ場所
- reducers
  - reducer
- views
  - 粒度に関係ないviewの置き場
  
反省
- ディレクトリ名がむき出しすぎる。抽象的な役割ででラッピングしたようなものがない
- commonの役割が曖昧すぎる
- viewのコンポーネントとreducerは機能として不可分だからディレクトリを分けるのは違う

## 202004
viewを扱うjsのフレームワークで最上位レイヤで扱いたいものはviewとアプリケーション処理
viewのためのアプリケーションだから同列。
階層としてはpages > futures > ~parts だが階層を平坦化したディレクトリを構成

- pages
  - ~Page
    - index.js
  - layouts
    - ~Layout.js
    - ~
- features
  - ~Future
    - components
    - viewModels
      - reducer(s)
      - (container(s))
      - (action(s))
    - appModels
      - reducer(s)
      - (container(s))
      - (action(s))
- lib
- viewParts

### pages
コンポーネントを組み合わせたページファイル

### features
値を持って機能を発揮できるファイル群
アコーディオンみたいにviewを切り替えるviewModelと
viewの裏側でアプリケーションの値を管理するappModelがある
futureが同階層のfutureを子要素として使うことも可能

#### viewModelとappModelの住み分け
appModelのデータを使い描画し、
描画後のイベントに必要なものやonclickイベント系に必要なものををviewModelにセット。
データ変更を含まない可視性などの管理をviewModelが行い、データ変更などが必要な時はviewModelsがappModelsを呼ぶ

#### modelディレクトリの役割
```js
import {Request} from "~/common/request"
import {HTTP_METHODS, EKZ_API_ROOT} from "~/common/const"

// public
// in rails: Controllerの処理のみ。詳細を言えばDBアクセス。ドメインロジック
export function choiceTagList(){
  return (dispatch) => {
    if(false /* クライアントに情報がある */){

    } else {
      return new Request(URL_BASE + "show_by_ids", {}, HTTP_METHODS.GET).access(data => {
        dispatch(actionChoiceTagList())
      })
    }
  }
}

// private for reducer
// in rails: ドメインロジック→プレゼンテーションロジック
function actionChoiceTagList(){
  return {
    type: ACTION_CHOICE_TAG_LIST
  }
}
export const ACTION_CHOICE_TAG_LIST = "ACTION_CHOICE_TAG_LIST"

// private but affect public field
// in rails: 処理抜きControllerとresponse プレゼンテーションロジック→view
// applicationReducerの場合はデータをセットするのみ。GraphQLで置き換わる部分
export default function choiceTagAppReducer(state = null, action){
  switch (action.type) {
    case ACTION_CHOICE_TAG_LIST:
      return state
    default:
      return state
  }
}
```

### viewParts
コンポーネントの中で共通で使う変更タイミングが同じパーツ
viewModelsを含まない単なるデザイン部品