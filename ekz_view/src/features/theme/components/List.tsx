import React from 'react';
import Table from 'react-bootstrap/Table';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { Theme } from '../models/graphql';
import { useTheme } from '../models/useTheme';
import ThemeComponent from './Theme';

type Props = {
  themes: Theme[];
};

export default (props: Props) => {
  const { themes: themesFromProps } = props;
  let themes;
  if (themesFromProps) {
    themes = themesFromProps;
  } else {
    const { data, loading } = useTheme();
    themes = data?.themes || themesFromProps || [];
    if (loading) return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>テーマ一覧</h1>
      <ErrorBoundary>
        {/* profileは複数のクエリをさばく練習として使用 */}
        {/* ユーザ名：{data.profile && data.profile.email} */}
        <Table bordered hover>
          <tbody>
            <tr>
              <td>新規追加フォームをここに</td>
            </tr>
            {themes.map((theme) => {
              return (
                <tr key={theme.id}>
                  <td>
                    <ThemeComponent theme={theme} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </ErrorBoundary>
    </div>
  );
};
