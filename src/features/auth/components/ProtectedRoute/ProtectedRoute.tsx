import { FunctionComponent, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RedirectCondition } from '../../types';
import { selectLoggedUser } from 'common/store';

interface ProtectedRouteProps extends PropsWithChildren {
  redirectIf?: RedirectCondition;
  redirectTo?: string;
}

export const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  redirectIf = RedirectCondition.Unauthenticated,
  redirectTo,
  children,
}) => {
  const loggedUser = useSelector(selectLoggedUser);

  const doRedirect =
    (redirectIf === RedirectCondition.Unauthenticated && !loggedUser) ||
    (redirectIf === RedirectCondition.Authenticated && !!loggedUser);

  const defaultRedirect =
    redirectIf === RedirectCondition.Authenticated
      ? '/calendar'
      : '/auth/login';

  const redirectTarget = redirectTo ?? defaultRedirect;

  if (doRedirect) {
    return <Navigate to={redirectTarget} replace />;
  }

  return <>{children}</>;
};
