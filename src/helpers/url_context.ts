import { Params } from 'react-router-dom';

import {
  AnecdoteContextParams,
  CommentContextParams,
  ContextParams,
  UrlContext,
  UserContextParams,
} from '../types/url_context';

const getContextParams = <T extends UrlContext = UrlContext>(
  urlContext: T,
  urlParams: Readonly<Params<string>>,
): ContextParams<T> => {
  switch (urlContext) {
    case 'user': {
      const userId = urlParams[UserContextParams.userId];
      if (!userId) {
        throw Error('URL param `userId` not found');
      }
      return {
        userId,
      } as ContextParams<T>;
    }
    case 'comment': {
      const userId = urlParams[UserContextParams.userId];
      const commentId = urlParams[CommentContextParams.commentId];
      if (!userId) {
        throw Error('URL param `userId` not found');
      }
      if (!commentId) {
        throw Error('URL param `commentId` not found');
      }
      return {
        userId,
        commentId,
      } as ContextParams<T>;
    }
    case 'anecdote': {
      const anecdoteId = urlParams[AnecdoteContextParams.anecdoteId];
      if (!anecdoteId) {
        throw Error('URL param `anecdoteId` not found');
      }
      return {
        anecdoteId,
      } as ContextParams<T>;
    }
    default: {
      const _exhaustiveCheck: never = urlContext;
      return _exhaustiveCheck;
    }
  }
};

export default {
  getContextParams,
};
