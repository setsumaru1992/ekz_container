import React from 'react';

interface Props {
  children: any;
}
interface State {
  hasError: boolean;
}

// next devがわかりやすくエラー出してくれるから頑張らなくて良いんだけど、本番実装するときにはこれでくくる。1個だけこれ使うコンポーネント用意する
export default class ErrorBoundary extends React.Component<Props, State> {
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
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <h1>エラーが発生しました。</h1>;
    }

    return children;
  }
}
