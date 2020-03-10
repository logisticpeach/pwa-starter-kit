/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { IRootState } from '../appstate';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  Action<string>
>

export const navigate = (path : string) : AppThunk => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'view1' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));
};

const loadPage = (page : string) : AppThunk => (dispatch) => {
  switch(page) {
    case 'view1':
      import('../components/my-view1.js').then((/*module*/) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    default:
      page = 'view404';
      import('../components/my-view404.js');
  }

  dispatch(updatePage(page));
};

export const updateOffline = (offline) : AppThunk => (dispatch) => {
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

const updatePage = (page : string) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};
