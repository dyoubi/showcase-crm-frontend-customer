import { Tooltip } from '@/core/shared/Tooltip';

import * as t from '../types';

interface TextElementProps {
  data?: t.TextElement;
}

export const TextElement = ({ data }: TextElementProps) => {
  let child = data?.color ? <span style={{ color: data.color }}>{data?.text}</span> : data?.text;

  if (data?.bold) {
    child = <strong>{child}</strong>;
  }

  if (data?.code) {
    child = <code>{child}</code>;
  }

  if (data?.italic) {
    child = <em>{child}</em>;
  }

  if (data?.underline) {
    child = <u>{child}</u>;
  }

  if (typeof data?.tooltip === 'string') {
    child = <Tooltip message={data.tooltip}>{child}</Tooltip>;
  }

  if (typeof data?.link === 'string') {
    child = (
      <a href={data.link} target="_blank" rel="noreferrer">
        {child}
      </a>
    );
  }

  return child;
};
