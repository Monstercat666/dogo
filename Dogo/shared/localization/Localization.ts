import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
  en: {
    dogo: 'Dogo',
    filterPlaceHolder: 'Filter the Breeds',
    back: 'Back',
    gallery: 'Gallery',
    noMasterBreed: 'Oops! No Dogo :(',
  },
  fr: {
    dogo: 'Dogo',
    filterPlaceHolder: 'Filtrer les Races',
    back: 'Retour',
    gallery: 'Gallerie',
    noMasterBreed: 'Oops! Pas de Dogo :(',
  },
});

export const capitalizeFirstLetter = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export default strings;
