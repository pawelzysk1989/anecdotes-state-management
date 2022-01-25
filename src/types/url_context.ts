export type UrlContext = 'user' | 'comment' | 'anecdote';

export const UserContextParams = {
  userId: 'userId',
} as const;

export const CommentContextParams = {
  userId: 'userId',
  commentId: 'commentId',
} as const;

export const AnecdoteContextParams = {
  anecdoteId: 'anecdoteId',
} as const;

type KeyValues<T> = { [k in keyof T]: string };

type UserCtxParams = KeyValues<typeof UserContextParams>;
type CommentCtxParams = KeyValues<typeof CommentContextParams>;
type AnecdoteCtxParams = KeyValues<typeof AnecdoteContextParams>;

export type ContextParams<T extends UrlContext = UrlContext> = T extends 'user'
  ? UserCtxParams
  : T extends 'comment'
  ? CommentCtxParams
  : T extends 'anecdote'
  ? AnecdoteCtxParams
  : never;
