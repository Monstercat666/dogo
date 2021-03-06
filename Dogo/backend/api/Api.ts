import {createFailure, Failures, Result} from '../../shared/util/Failure';

export const JSONHeaders = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const URL = 'https://dog.ceo/api/breed';

export const allBreedsURL = 's/list/all';

export const breedImagesURL = '/images';
export const breedImagesURLRandom = '/random';

export async function FETCH(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Result<any>> {
  return fetch(input, init)
    .then(async response => {
      const _jsonResponse = await jsonResponse(response);
      if (isAPIFailure(_jsonResponse)) {
        return createFailure(Failures.Unspecified, _jsonResponse.message);
      }
      return _jsonResponse.message;
    })
    .catch(e => {
      return createFailure(Failures.Unspecified, e.message ?? '');
    });
}

async function jsonResponse(response: Response): Promise<any> {
  return response.json();
}

function isAPIFailure(response: any): boolean {
  return response.status === 'error';
}
