import { useContext } from 'react';
import { QueryOptions, useQuery } from 'react-query';

import { getResource, getResourceList } from './api';
import { HasuraResourceContext, HasuraResourceContextConfig } from './context';
import { BaseGetResourceHookProps, BaseGetResourceListHookProps } from './props';

export const DEFAULT_PRIMARY_KEY = 'id';

const getPrimaryKey = (tableName: string, config: HasuraResourceContextConfig): string => {
  let primaryKey = DEFAULT_PRIMARY_KEY;

  if (config && config['primaryKey'][tableName]) {
    primaryKey = config['primaryKey'][tableName];
  }
  return primaryKey;
};

export function useGetResource<TResult>(hookProps: BaseGetResourceHookProps, queryOptions: QueryOptions<TResult> = {}) {
  const { id, tableName } = hookProps;
  const { endpoint, config, headers } = useContext(HasuraResourceContext);
  const primaryKey = getPrimaryKey(tableName, config);
  return useQuery<TResult, [string, any]>(
    [`${tableName}-${id}`, { ...hookProps, primaryKey, endpoint, headers, config }],
    getResource as any,
    queryOptions
  );
}

export function useGetResourceList<
  TResult extends [any[] | undefined, { count: number }] = [any[] | undefined, { count: number }]
>(hookProps: BaseGetResourceListHookProps, queryOptions: QueryOptions<TResult> = {}) {
  const { tableName } = hookProps;
  const { endpoint, config, headers } = useContext(HasuraResourceContext);
  const primaryKey = getPrimaryKey(tableName, config);
  const { data: payload, ...queryResult } = useQuery<TResult, [string, any]>(
    [`${tableName}`, { ...hookProps, primaryKey, endpoint, headers, config }],
    getResourceList as any,
    queryOptions
  );

  if (payload) {
    const [data, total] = payload;
    return {
      ...queryResult,
      data: data,
      totalCount: total.count,
    };
  }

  return {
    ...queryResult,
    data: undefined,
    totalCount: 0,
  };
}
