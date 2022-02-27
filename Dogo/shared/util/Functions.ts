import {
  allBreedsURL,
  breedImagesURL as breedImagesURL,
  breedImagesURLRandom,
  FETCH,
  JSONHeaders,
  URL,
} from '../../backend/api/Api';
import {Result} from './Failure';
import {
  MasterAndSubBreeds,
  FilteredBreedsMap,
  FilteredBreedsMapWithFlag,
} from './Types';
import _ from 'lodash';

const BreedsSeperator = '-';

export async function getAllBreeds(): Promise<Result<MasterAndSubBreeds>> {
  const result = await FETCH(constructListAllBreedsURL(), JSONHeaders);

  // Type assertion because https://dog.ceo/dog-api/documentation/ precises the succesful message type
  return result as Result<MasterAndSubBreeds>;
}

export async function getRandomMasterBreedImages(
  masterBreed: string,
  count: number,
) {
  const result = await FETCH(
    constructRandomBreedImagesURL(masterBreed, count),
    JSONHeaders,
  );

  // Type assertion because https://dog.ceo/dog-api/documentation/ precises the succesful message type
  return result as Result<string[]>;
}

export async function getRandomSubBreedImages(
  masterBreed: string,
  subBreed: string,
  count: number,
) {
  const result = await FETCH(
    constructRandomBreedImagesURL(masterBreed + '/' + subBreed, count),
    JSONHeaders,
  );

  // Type assertion because https://dog.ceo/dog-api/documentation/ precises the succesful message type
  return result as Result<string[]>;
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
  filteredBreedsMap: FilteredBreedsMap,
  input?: string,
): FilteredBreedsMapWithFlag {
  let masterBreedFlag = false;
  const _input = input?.toLocaleLowerCase();
  Array.from(filteredBreedsMap.values()).forEach(value => {
    // The flag below is to keep track if any the belonging subBreeds is matching the filter input.
    // If so, we'll un-hide(!hidden) the master breed automaticaly regardless if it matches the filter input or not
    let subBreedFlag = false;

    if (_input) {
      value.subBreeds.forEach(subBreed => {
        if (_.includes(subBreed.name, _input)) {
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

    if (!_input || subBreedFlag || _.includes(value.name, _input)) {
      value.hidden = false;
      if (!masterBreedFlag) {
        masterBreedFlag = true;
      }
    } else {
      value.hidden = true;
    }
  });

  return {
    filteredBreedsMap: filteredBreedsMap,
    isSomeBreedDisplayed: masterBreedFlag,
  };
}

function constructListAllBreedsURL(): string {
  return URL + allBreedsURL;
}

function constructRandomBreedImagesURL(
  breedName: string,
  count: number,
): string {
  return (
    URL +
    '/' +
    breedName +
    breedImagesURL +
    breedImagesURLRandom +
    '/' +
    count.toString()
  );
}

export function getMasterSubBreedCombinationString(
  masterBreed: string,
  subBreed: string,
): string {
  return masterBreed + BreedsSeperator + subBreed;
}
