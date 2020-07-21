import React, { Fragment, useMemo, memo } from 'react';

import { useGetResource } from './hooks';
import { HasuraResourceProps } from './props';

export const HasuraResource = ({ id, tableName, render, args, queryOptions }: HasuraResourceProps) => {
  const Render = memo(() => {
    const queryResult = useGetResource<any>({ id, tableName, args }, queryOptions);
    const memoRender = useMemo(() => render(queryResult), [queryResult]);
    return <Fragment>{memoRender}</Fragment>;
  });

  return <Render />;
};
