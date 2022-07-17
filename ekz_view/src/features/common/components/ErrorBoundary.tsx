import React from "react";

// next devがわかりやすくエラー出してくれるから頑張らなくて良いんだけど、本番実装するときにはこれでくくる。1個だけこれ使うコンポーネント用意する
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>エラーが発生しました。</h1>;
    }

    return this.props.children;
  }
}
