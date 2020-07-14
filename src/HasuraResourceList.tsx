import React, { Fragment, useMemo } from 'react';

import { useGetResourceList } from './hooks';
import { HasuraResourceListProps } from './props';

export const HasuraResourceList = (({ tableName, render, args, queryOptions }: HasuraResourceListProps) => {
  const Render = useMemo(() => () => {
    const { data, status, error } = useGetResourceList<[object[], { count: number; }]>({ tableName, args }, queryOptions)

    const memoRender = useMemo(() => {
      if (Array.isArray(data) && data.length === 2) {
        return render({
          data: data && data[0],
          totalCount: data && data[1]['count'] || 0,
          error,
          status,
        });
      }
      return render({
        data: data,
        totalCount: 0,
        error,
        status,
      });
    }, [data, status, error])

    return <Fragment>{memoRender}</Fragment>;
  }, [args, tableName, render, queryOptions])
  
  return <Render />
});
