import React from 'react';
import Table from 'react-bootstrap/Table';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { Theme } from '../models/graphql';
import { useTheme } from '../models/useTheme';
import ThemeComponent from './Theme';

type Props = {
  themes: Theme[];
};

type NewThemeInputs = {
  name: string;
  description: string;
};

export default (props: Props) => {
  const { themes: themesFromProps } = props;
  let themes;
  if (themesFromProps) {
    themes = themesFromProps;
  } else {
    const { themes: themesByFetching, loading } = useTheme();
    themes = themesByFetching;
    // themes = data?.themes || themesFromProps || []; // サーバサイドで取得した値とhooksで取得した値との兼ね合いを表現する場合
    if (loading) return <div>Loading...</div>;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewThemeInputs>();
  const onSubmit: SubmitHandler<NewThemeInputs> = (input) => console.log(input);

  return (
    <div>
      <h1>テーマ一覧</h1>
      <ErrorBoundary>
        {/* profileは複数のクエリをさばく練習として使用 */}
        {/* ユーザ名：{data.profile && data.profile.email} */}
        <Table bordered hover>
          <tbody>
            <tr>
              <td>
                <form onSubmit={handleSubmit(onSubmit)}>
                  新テーマ名
                  <input {...register('name', { required: true })} />
                  {errors.name && <span>This field is required</span>}
                  <input type="submit" />
                </form>
              </td>
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
