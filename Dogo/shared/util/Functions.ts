import {allBreedsURL, FETCH, JSONHeaders} from '../../backend/api/Api';
import {Result} from './Failure';
import {MasterAndSubBreeds, FilteredBreedsMap} from './Types';
import _ from 'lodash';

export async function getAllBreeds(): Promise<Result<MasterAndSubBreeds>> {
  const result = await FETCH(allBreedsURL, JSONHeaders);

  // Type assertion because https://dog.ceo/dog-api/documentation/ precises the succesful message type
  return result as Result<MasterAndSubBreeds>;
}

// When it comes to filtering, I had the choice to make this function that will allow me to edit the hidden property based on the filter input
// Or, I would have created two states for the breeds in the home component
// for example originalBreeds and filteredBreeds (original one to filter based on it, and the filtered one to pass it as a value)
// but the second choice will cost me at the worst case scenario twice the memory (For example if the originalBreeds is 1MB in size and let's say there's a filter common between all the breeds, means that none will be filtered out .. Ill use 2MB of memory)
// so this function filterFormatBreeds will be called once and will preserve the original data by just adding the hidden property
export function getFilterFormattedBreeds(
  breeds: MasterAndSubBreeds,
): FilteredBreedsMap {
  const _map: FilteredBreedsMap = new Map();
  Array.from(Object.entries(breeds)).forEach(([key, value]) => {
    _map.set(key, {
      subBreeds: value.map(v => {
        return {name: v};
      }),
      name: key,
    });
  });

  return _map;
}

export function filterBreeds(
  allBreeds: FilteredBreedsMap,
  input?: string,
): FilteredBreedsMap {
  Array.from(allBreeds.values()).forEach(value => {
    // The flag below is to keep track if any the belonging subBreeds is matching the filter input
    let subBreedFlag = false;

    if (input) {
      value.subBreeds.forEach(subBreed => {
        if (_.includes(subBreed.name, input)) {
          subBreed.hidden = false;
          if (!subBreedFlag) {
            subBreedFlag = true;
          }
        } else {
          subBreed.hidden = true;
        }
      });
    } else {
      value.subBreeds.forEach(subBreed => {
        subBreed.hidden = false;
      });
    }

    if (!input || subBreedFlag || _.includes(value.name, input)) {
      value.hidden = false;
    } else {
      value.hidden = true;
    }
  });

  return allBreeds;
}
