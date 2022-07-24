import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { Theme as ThemeType } from '../models/queries/fetchThemes';
import useThemeCommand, {
  UpdateTheme,
} from '../models/commands/useThemeCommand';

type Props = {
  theme: ThemeType;
  refetch: any;
};

export default (props: Props) => {
  const { theme, refetch } = props;
  const [editing, setEditing] = useState(false);

  const { updateTheme, updateLoading } = useThemeCommand();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateTheme>();
  const onSubmit: SubmitHandler<UpdateTheme> = (input: UpdateTheme) => {
    updateTheme(input, {
      onCompleted: () => {
        refetch();
        setEditing(false);
      },
    });
  };

  const iconStyle = { color: 'black' };
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          marginRight: 'auto',
        }}
      >
        {!editing ? (
          <>
            <Link
              href={{
                pathname: '/mypage/themes/[themeId]',
              }}
              as={`/mypage/themes/${theme.id}`}
            >
              <a>{theme.name}</a>
            </Link>
            {theme.description ? (
              <>
                <br />
                {theme.description}
              </>
            ) : null}
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              {...register('id', { valueAsNumber: true })}
              value={theme.id}
            />
            テーマ名
            <input
              {...register('name', { required: true })}
              defaultValue={theme.name}
            />
            {errors.name && <span>This field is required</span>}
            <input type="submit" disabled={updateLoading} />
          </form>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <a href="#">
          <i
            className="fas fa-pen fa-fw"
            style={iconStyle}
            onClick={() => setEditing(!editing)}
          />
        </a>
        <a href="#">
          <i
            className="fas fa-trash fa-fw"
            style={iconStyle}
            onClick={() => {
              const deleteOk =
                window.confirm('本当に削除してもよろしいですか？');
              if (!deleteOk) return;
              // actionAsyncThemeDestroy(theme.id);
            }}
          />
        </a>
      </div>
    </div>
  );
};
