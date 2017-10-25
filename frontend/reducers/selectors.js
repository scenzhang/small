import {values} from 'lodash';

export const allArticles = state => values(state.entities.articles);