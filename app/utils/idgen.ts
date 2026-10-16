import { v4 as uuidv4 } from 'uuid';

export const genID = (provided?: string | number | undefined) => {
  if (!provided) {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  if (typeof provided === 'string') {
    return provided;
  }

  return provided.toString();
};

export const genUID = () => uuidv4();
