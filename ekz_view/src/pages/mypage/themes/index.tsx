import React from 'react';
import { withApollo } from '../../../lib/apollo';
import { 
  ThemeListArea, 
} from '../../../features/theme';

type Props = {}

const Themes : React.FC<Props> = () => {
  return(
    <React.Fragment>
      <ThemeListArea />
    </React.Fragment>
  )
}

// export const getServerSideProps = async (context) => {
//   const data: Props = {
//     themes: [{
//       id: 1,
//       name: "ダミーテーマデータ",
//       description: "descriptiondescription"
//     }]
//   }
//   return {props: data}
// }

export default withApollo()(Themes)