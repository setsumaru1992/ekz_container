import React from 'react';
// import { GetServerSideProps } from 'next';
import { withApollo } from '../../lib/apollo';
import { List } from '../../features/theme';

interface Props {
  themes: {
    id: number;
    name: string;
    description: string;
  }[];
}

const Themes : React.FC<Props> = ({themes}) => {
  return(
    <React.Fragment>
      <List/>
      {themes && themes.map((theme) => theme.name)}
    </React.Fragment>
    
  )
}

// 20200525 最新（ローカルのままかも）の以下に思考のスナップショットが記載されている
// https://github.com/setsumaru1992/todo_list_with_modern_environment/tree/master/tasklog/next
export const getServerSideProps = async (context) => {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  const data: Props = {
    themes: [{
      id: 1,
      name: "apple",
      description: "descriptiondescription"
    }]
  }
  return {props: data}
}

export default withApollo()(Themes)