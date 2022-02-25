import LocalizedStrings from 'react-native-localization';

let strings = new LocalizedStrings({
  en: {
    filterPlaceHolder: 'Filter the Breeds',
  },
  fr: {
    filterPlaceHolder: 'Filtrer les Races',
  },
});

export const capitalizeFirstLetter = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export default strings;