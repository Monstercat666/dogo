import {allBreedsURL, FETCH, JSONHeaders} from '../../backend/api/Api';
import {Result} from './Failure';

export type MasterAndSubBreeds = {
  [masterBreed: string]: string[];
};

export async function getAllBreeds(): Promise<Result<MasterAndSubBreeds>> {
  const result = await FETCH(allBreedsURL, JSONHeaders);

  // Type assertion because https://dog.ceo/dog-api/documentation/ precises the succesful message type
  return result as Result<MasterAndSubBreeds>;
}
