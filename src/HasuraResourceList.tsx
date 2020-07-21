import React, { Fragment, memo, useMemo } from 'react';

import { useGetResourceList } from './hooks';
import { HasuraResourceListProps } from './props';

export const HasuraResourceList = ({ tableName, render, args, queryOptions }: HasuraResourceListProps) => {
  const Render = memo(() => {
    const { data, ...resultProps } = useGetResourceList<[any[], { count: number }]>({ tableName, args }, queryOptions);
    
    const memoRender = useMemo(() => {
      if (Array.isArray(data) && data.length === 2) {
        return render({
          ...resultProps,
          data: data && data[0],
          totalCount: (data && data[1]['count']) || 0,
        });
      }
      return render({
        ...resultProps,
        data: data,
        totalCount: 0,
      });
    }, [data, resultProps]);

    return <Fragment>{memoRender}</Fragment>;
  });

  return <Render />;
};
