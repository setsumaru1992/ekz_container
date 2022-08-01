import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useChoiceCommand, {
  AddChoice,
} from '../models/commands/useChoiceCommand';

export default (props) => {
  const { themeId, onCreated } = props;

  const { addChoice, commandLoading } = useChoiceCommand();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddChoice>();
  const onSubmit: SubmitHandler<AddChoice> = async (input) => {
    input.evaluation = input.evaluation ? 1 : 0;
    await addChoice(input, {
      onCompleted: async (createdChoice) => {
        await onCreated(createdChoice);
        reset();
      },
    });
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
        <input
          type="hidden"
          value={themeId}
          {...register('themeId', { required: true, valueAsNumber: true })}
        />
        <br />
        <input type="submit" disabled={commandLoading} value="新規作成" />
      </form>
    </div>
  );
};
