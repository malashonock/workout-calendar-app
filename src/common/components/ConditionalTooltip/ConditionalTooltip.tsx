import { ComponentProps, FunctionComponent, PropsWithChildren } from 'react';
import { Tooltip } from '@mui/material';

interface ConditionalTooltipProps
  extends PropsWithChildren<ComponentProps<typeof Tooltip>> {
  showIf: boolean;
}

export const ConditionalTooltip: FunctionComponent<ConditionalTooltipProps> = ({
  showIf,
  children,
  ...tooltipProps
}) => {
  return showIf ? <Tooltip {...tooltipProps}>{children}</Tooltip> : children;
};
