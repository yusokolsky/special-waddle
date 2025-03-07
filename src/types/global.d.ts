import { ReactElement, ReactNode } from 'react';

declare global {
  namespace JSX {
    interface Element extends ReactElement<any, any> { }
  }
  
  namespace React {
    interface FunctionComponent<P = {}> {
      (props: P, context?: any): ReactElement<any, any> | null;
    }
  }
}

export {}; 