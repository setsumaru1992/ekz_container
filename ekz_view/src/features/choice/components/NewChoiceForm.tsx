import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AddTheme } from '../../theme/models/commands/useThemeCommand';

export default (props) => {
  const { onCreated } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTheme>();
  const onSubmit: SubmitHandler<AddTheme> = (input) => {
    input.evaluation = input.evaluation ? 1 : 0;
    // addTheme(input, {
    //   onCompleted: (createdChoice) => {
    //     onCreated(createdChoice);
    //     reset();
    //   },
    // });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        選択肢名
        <input {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>} <br />
        URL
        <input {...register('url', { required: false })} /> <br />
        説明
        <input {...register('description', { required: false })} /> <br />
        <label>
          <input
            type="checkbox"
            {...register('evaluation', { required: false })}
          />{' '}
          お気に入り
        </label>
        <br />
        <input type="submit" disabled={false} value="新規作成" />
      </form>
    </div>
  );
};
