import React from 'react';
import { Meta, StoryFn as Story } from '@storybook/react';

import { TooltipPosition } from './types';

import { Tooltip, TooltipProps } from './index';

export default {
  title: 'ui/Tooltip',
  component: Tooltip,
} as Meta;

const RenderTooltip = ({ rootPosition }: { rootPosition: TooltipPosition }) => (
  <div style={{ borderBottom: '1px solid white ', paddingBottom: 100 }}>
    <h1 style={{ textAlign: 'center' }}>{rootPosition}</h1>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {(['start', '', 'end'] as const).map((item) => {
        const fullPosition = `${rootPosition}${item ? `-${item}` : ''}` as const;

        return (
          <Tooltip
            key={fullPosition}
            message={<div>My tooltip&apos;s content at position {fullPosition}</div>}
            position={rootPosition}
          >
            <div style={{ padding: '10px', border: '1px solid black', cursor: 'pointer' }}>Hover me</div>
          </Tooltip>
        );
      })}
    </div>
  </div>
);

const Template: Story<TooltipProps> = () => (
  <div>
    <RenderTooltip rootPosition="top" />
    <RenderTooltip rootPosition="right" />
    <RenderTooltip rootPosition="bottom" />
    <RenderTooltip rootPosition="left" />
    <RenderTooltip rootPosition="top-start" />
    <RenderTooltip rootPosition="top-end" />
    <RenderTooltip rootPosition="right-start" />
  </div>
);

export const Default = Template.bind({});
