import {allBreedsURL, FETCH, JSONHeaders} from '../../backend/api/Api';
import {Result} from './Failure';

export async function getAllBreeds(): Promise<
  Result<Map<string, Array<string>>>
> {
  const result = await FETCH(allBreedsURL, JSONHeaders);

  // Type assertion because https://dog.ceo/dog-api/documentation/ precises the succesful message type
  return result as Result<Map<string, Array<string>>>;
}
