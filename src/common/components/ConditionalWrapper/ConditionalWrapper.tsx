import React, { ReactNode, FunctionComponent } from 'react';

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (typeof React.createElement.arguments)[0];
  wrapperProps: (typeof React.createElement.arguments)[1];
  children: NonNullable<ReactNode>;
}

export const ConditionalWrapper: FunctionComponent<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  wrapperProps,
  children,
}) => {
  return condition ? (
    React.createElement(wrapper, wrapperProps, [children])
  ) : (
    <>{children}</>
  );
};
