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

type ParamToValue<T> = { [k in keyof T]: string };

type UserCtxParams = ParamToValue<typeof UserContextParams>;
type CommentCtxParams = ParamToValue<typeof CommentContextParams>;
type AnecdoteCtxParams = ParamToValue<typeof AnecdoteContextParams>;

export type ContextParams<T extends UrlContext> = 'user' extends T
  ? UserCtxParams
  : 'comment' extends T
  ? CommentCtxParams
  : 'anecdote' extends T
  ? AnecdoteCtxParams
  : never;
