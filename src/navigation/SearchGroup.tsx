import React from 'react';

import {Stack} from './RootNavigation';
import SearchPage from '../search/SearchPage';

function SearchGroup() {
  return (
    <Stack.Group>
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{headerShown: false}}
      />
    </Stack.Group>
  );
}

export default SearchGroup;
