import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import useChoiceCommand, {
  UpdateChoice,
} from '../../models/commands/useChoiceCommand';
import { Choice } from '../../models/queries/pickEkz';

const openUrlInNewTab = (url) => {
  window.open(url, String(new Date().getTime()));
};
const extractString = (str, maxLength) => {
  if (str.length > maxLength) {
    return `${str.substr(0, maxLength - 1)}...`;
  }
  return str;
};

const ChoiceName = (props: { choice: Choice }) => {
  const { choice } = props;
  const titleContentTag = (() => {
    const choiceName = extractString(choice.name, 20);
    if (choice.url) {
      return (
        <a
          href={choice.url}
          onMouseDown={(e) => {
            e.preventDefault();
            openUrlInNewTab(choice.url);
          }}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {choiceName}
          <br />({extractString(choice.url, 20)})
        </a>
      );
    }
    return <>{choiceName}</>;
  })();

  const fontSize = '16px';
  return (
    <div
      style={{
        fontSize,
        display: 'inline-flex',
      }}
    >
      <h1
        style={{
          fontSize,
        }}
      >
        {titleContentTag}
      </h1>
      &nbsp;
    </div>
  );
};

const ChoiceTitleAndProperties = (props: {
  choice: Choice;
  openEditor: any;
}) => {
  const { choice, openEditor } = props;
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <div>
          <ChoiceName choice={choice} />
          <i
            className="fas fa-pen fa-fw"
            style={false ? { color: 'black' } : { color: '#CCCCCC' }}
            onClick={() => openEditor()}
          />
        </div>
        <div>
          {choice.description && choice.description !== '' && (
            <div style={{ display: 'inline-flex' }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: choice.description.replace(/\n/g, '<br />'),
                }}
              />
              &nbsp;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChoiceTitleAndPropertiesUpdateArea = (props: {
  choice: Choice;
  closeEditor: any;
  updateDisplayChoice: any;
}) => {
  const { choice, closeEditor, updateDisplayChoice } = props;
  const { updateChoice, commandLoading } = useChoiceCommand();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateChoice>();
  const onSubmit: SubmitHandler<UpdateChoice> = async (input) => {
    await updateChoice(input, choice, {
      onCompleted: async (updatedChoice) => {
        closeEditor();
        updateDisplayChoice(updatedChoice);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        選択肢名
        <input
          {...register('name', { required: true })}
          defaultValue={choice.name}
        />
        {errors.name && <span>This field is required</span>}
        <i
          className="fas fa-pen fa-fw"
          style={false ? { color: 'black' } : { color: '#CCCCCC' }}
          onClick={() => closeEditor()}
        />
        <br />
        URL
        <input
          {...register('url', { required: false })}
          defaultValue={choice.url}
        />{' '}
        <br />
        説明
        <input
          {...register('description', { required: false })}
          defaultValue={choice.description}
        />{' '}
        <br />
        <br />
        <input type="submit" disabled={commandLoading} value="修正" />
      </form>
    </div>
  );
};

export default (props: { choice: Choice; updateDisplayingChoice: any }) => {
  const { choice, updateDisplayingChoice } = props;
  const [titleAndPropertiesEditing, setTitleAndPropertiesEditing] =
    useState(false);
  return (
    <>
      {titleAndPropertiesEditing ? (
        <ChoiceTitleAndPropertiesUpdateArea
          choice={choice}
          closeEditor={() => {
            setTitleAndPropertiesEditing(false);
          }}
          updateDisplayChoice={updateDisplayingChoice}
        />
      ) : (
        <ChoiceTitleAndProperties
          choice={choice}
          openEditor={() => {
            setTitleAndPropertiesEditing(true);
          }}
        />
      )}
    </>
  );
};
