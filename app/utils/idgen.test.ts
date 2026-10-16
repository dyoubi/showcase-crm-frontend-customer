import { v4 as uuidv4 } from 'uuid';

import { genID, genUID } from './idgen';

jest.mock('uuid');

describe('genID', () => {
  it('should generate a random ID when no argument is provided', () => {
    const id = genID();

    expect(id).toBeDefined();
  });

  it('should return the provided string if a string is provided', () => {
    const provided = 'testString';
    const id = genID(provided);

    expect(id).toBe(provided);
  });

  it('should return the provided number as a string if a number is provided', () => {
    const provided = 12345;
    const id = genID(provided);

    expect(id).toBe(provided.toString());
  });
});

describe('genUID', () => {
  it('should generate a UUID', () => {
    const mockUUID = '123e4567-e89b-12d3-a456-426614174000';

    (uuidv4 as jest.Mock).mockReturnValue(mockUUID);

    const uid = genUID();

    expect(uid).toBe(mockUUID);
  });
});
