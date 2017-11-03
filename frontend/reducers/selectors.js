import {values} from 'lodash';

export const allArticles = state => values(state.entities.articles);

export const feedArticles = (state, ids) => ids.map(id => state.entities.articles[id]);