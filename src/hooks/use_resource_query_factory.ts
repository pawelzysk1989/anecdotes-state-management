import axios from 'axios';
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query';

interface Config<T> {
  path: string;
  queryKey?: string;
  baseUrl?: string;
  getId: (entity: T) => string;
}

const useResourceQueryFactory = <Entity, EntityDetails, EntityCandidate = EntityDetails>(
  config: Config<Entity | EntityDetails>,
) => {
  const baseUrl = config.baseUrl ?? 'http://localhost:3001';
  const queryKey = config.queryKey ?? config.path;
  const url = `${baseUrl}/${config.path}`;

  return {
    getAll: () => {
      const query = useQuery(queryKey, async () => {
        const response = await axios.get<Entity[]>(url);
        return response.data;
      });
      return query.data;
    },

    get: (id: string) => {
      const get = useQuery([queryKey, { id }], async () => {
        const response = await axios.get<EntityDetails>(`${url}/${id}`);
        return response.data;
      });
      return get.data;
    },

    create: (
      configuration: {
        invalidateKey?: QueryKey | null;
        onSuccess?: (entity: EntityDetails) => void;
      } = {},
    ) => {
      const queryClient = useQueryClient();

      const request = async (entity: EntityCandidate) => {
        const response = await axios.post<EntityDetails>(url, entity);
        return response.data;
      };

      const create = useMutation(request, {
        onSuccess: (entity) => {
          if (configuration.invalidateKey !== null) {
            queryClient.invalidateQueries(configuration.invalidateKey ?? queryKey);
          }
          configuration.onSuccess?.(entity);
        },
      });

      return (candidate: EntityCandidate) => create.mutate(candidate);
    },

    update: (
      configuration: {
        invalidateKey?: QueryKey | null;
        onSuccess?: (entity: EntityDetails) => void;
      } = {},
    ) => {
      const queryClient = useQueryClient();

      const request = async (entity: EntityDetails) => {
        const response = await axios.put<EntityDetails>(
          `${url}/${config.getId(entity)}`,
          entity,
        );
        return response.data;
      };

      const update = useMutation(request, {
        onSuccess: (entity) => {
          if (configuration.invalidateKey !== null) {
            queryClient.invalidateQueries(configuration.invalidateKey ?? queryKey);
          }

          configuration.onSuccess?.(entity);
        },
      });

      return (entity: EntityDetails) => update.mutate(entity);
    },
  };
};

export default useResourceQueryFactory;
