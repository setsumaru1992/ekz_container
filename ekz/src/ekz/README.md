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

- features
  - appFutures
    - hogeFuture(ex: auth)
  - viewFutures
    - hogeFuture
      - components
      - viewModels
        - reducer(s)
        - (container(s))
        - (action(s))
- viewParts
- pages
  - bazPage
    - index.js
  - layouts
    - hogeLayout.js
    - ~

### features
値を持って機能を発揮できるファイル群
アコーディオンみたいにviewを切り替えるものと
viewの裏側でアプリケーションの値を管理するものがある

#### viewのfuture
viewとviewの値を管理するファイル群

#### applicationのfuture
表題の通り

### viewParts
コンポーネントの中で共通で使う変更タイミングが同じパーツ

### pages
コンポーネントを組み合わせたページファイル