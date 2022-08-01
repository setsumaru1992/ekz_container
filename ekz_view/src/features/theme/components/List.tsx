import React from 'react';
import Table from 'react-bootstrap/Table';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import { Theme } from '../models/queries/fetchThemes';
import useThemesQuery from '../models/queries/useThemesQuery';
import useThemeCommand, { AddTheme } from '../models/commands/useThemeCommand';
import ThemeComponent from './Theme';

type Props = {
  themes: Theme[];
};

export default (props: Props) => {
  const { themes: themesFromProps } = props;

  const {
    themes: themesByFetching,
    fetchLoading,
    refetch,
  } = useThemesQuery(!themesFromProps);
  const themes = themesByFetching || themesFromProps || [];

  const { addTheme, commandLoading } = useThemeCommand();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTheme>();
  const onSubmit: SubmitHandler<AddTheme> = (input) => {
    addTheme(input, {
      onCompleted: () => {
        refetch();
        reset();
      },
    });
  };

  if (fetchLoading) return <div>Loading...</div>; // 必ずhooksがすべて終わった後に分岐を使う

  return (
    <div>
      <h1>テーマ一覧</h1>
      <ErrorBoundary>
        <Table bordered hover>
          <tbody>
            <tr>
              <td>
                <form onSubmit={handleSubmit(onSubmit)}>
                  新テーマ名
                  <input {...register('name', { required: true })} />
                  {errors.name && <span>This field is required</span>}
                  <input type="submit" disabled={commandLoading} />
                </form>
              </td>
            </tr>
            {themes.map((theme) => {
              return (
                <tr key={theme.id}>
                  <td>
                    <ThemeComponent theme={theme} refetch={refetch} />
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
