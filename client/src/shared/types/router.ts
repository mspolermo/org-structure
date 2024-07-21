import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean; //на будующее, для авторизации и защищенных роутов
}
