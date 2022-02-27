export type MasterAndSubBreeds = {
  [masterBreed: string]: string[];
};
export type FilteredBreedsMap = Map<string, FilteredMasterBreeds>;

export type FilteredMasterBreeds = {
  name: string;
  subBreeds: FilteredSubBreeds[];
  hidden?: boolean;
};

export type FilteredSubBreeds = {
  name: string;
  hidden?: boolean;
};

export type BreedImagesMap = Map<string, string[]>;
