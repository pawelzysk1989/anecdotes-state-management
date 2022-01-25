import { useParams } from 'react-router-dom';

import url_context from '../helpers/url_context';
import { ContextParams, UrlContext } from '../types/url_context';

const useUrlParams = <T extends UrlContext = UrlContext>(
  context: T,
): ContextParams<T> => {
  const urlParams = useParams();
  const contextParams = url_context.getContextParams(context, urlParams);
  return contextParams;
};

export default useUrlParams;
