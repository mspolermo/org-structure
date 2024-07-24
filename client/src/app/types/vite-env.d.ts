/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss';
declare module '*.tsx';
declare const __API_ORGUNIT__: string;
declare const __API_NAV__: string;
declare const __API_PERSON_DETAILS_FAST__: string;
declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;

  export default ReactComponent;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />