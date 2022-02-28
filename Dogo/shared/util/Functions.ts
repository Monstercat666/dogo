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
  let existsOneAtLeast = false;
  const _input = input?.toLocaleLowerCase();
  Array.from(filteredBreedsMap.values()).forEach(value => {
    if (!_input || _.includes(value.name, _input)) {
      value.hidden = false;
      if (!existsOneAtLeast) {
        existsOneAtLeast = true;
      }

      // Following the design provided: the master breed name is added to the sub breed name
      // So if the filter input is included in the master breed name
      // it'll be included in the sub breeds
      value.subBreeds.forEach(subBreed => {
        subBreed.hidden = false;
      });
    } else {
      value.hidden = true;

      if (_input) {
        value.subBreeds.forEach(subBreed => {
          if (_.includes(subBreed.name, _input)) {
            subBreed.hidden = false;
            if (!existsOneAtLeast) {
              existsOneAtLeast = true;
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
    }
  });

  return {
    filteredBreedsMap: filteredBreedsMap,
    isSomeBreedDisplayed: existsOneAtLeast,
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
