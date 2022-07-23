import React from 'react';
import Table from 'react-bootstrap/Table';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { Theme } from '../models/queries/fetchThemes';
import useThemesFetching from '../models/queries/useThemesFetching';
import ThemeComponent from './Theme';
import useThemeUpdating from '../models/mutations/useThemeUpdating';

type Props = {
  themes: Theme[];
};

type NewThemeInputs = {
  name: string;
  description: string;
};

export default (props: Props) => {
  const { themes: themesFromProps } = props;

  const {
    themes: themesByFetching,
    fetchLoading,
    refetch,
  } = useThemesFetching(!themesFromProps);
  const themes = themesByFetching || themesFromProps;

  const { addTheme, updateLoading } = useThemeUpdating();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewThemeInputs>();
  // TODO: 追加処理が成功したらrefetchする（成功時の書き方がわからないため保留中）
  const onSubmit: SubmitHandler<NewThemeInputs> = (input) =>
    addTheme(input, {
      onCompleted: () => {
        refetch();
        reset();
      },
      // refetchQueries: ['themes'],
    });

  if (fetchLoading) return <div>Loading...</div>; // 必ずhooksがすべて終わった後から分岐を使う

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
                  <input type="submit" disabled={updateLoading} />
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
