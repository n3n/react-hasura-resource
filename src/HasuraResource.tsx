import React, { Fragment, useMemo, memo } from 'react';

import { useGetResource } from './hooks';
import { HasuraResourceProps } from './props';

export const HasuraResource = ({ id, tableName, render, args, queryOptions }: HasuraResourceProps) => {
  const Render = memo(() => {
    const { data, status, error } = useGetResource<any>({ id, tableName, args }, queryOptions);

    const memoRender = useMemo(
      () =>
        render({
          data: data,
          status,
          error,
        }),
      [data, status, error]
    );

    return <Fragment>{memoRender}</Fragment>;
  });

  return <Render />;
};
