import React, { Fragment, useMemo } from 'react';

import { useGetResource } from './hooks';
import { HasuraResourceProps } from './props';

export const HasuraResource = (({ id, tableName, render, args, queryOptions }: HasuraResourceProps) => {
  const Render = useMemo(() => () => {
    const { data, status, error } = useGetResource<object>({ id, tableName, args }, queryOptions)

    const memoRender = useMemo(() => render({
      data: data,
      status,
      error,
    }), [data, status, error])

    return <Fragment>{memoRender}</Fragment>;
  }, [args, tableName, render, queryOptions])
  
  return <Render />
});
