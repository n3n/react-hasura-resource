import React, { Fragment, memo, useMemo } from 'react';

import { useGetResourceList } from './hooks';
import { HasuraResourceListProps } from './props';

export const HasuraResourceList = ({ tableName, render, args, queryOptions }: HasuraResourceListProps) => {
  const Render = memo(() => {
    const queryResult = useGetResourceList({ tableName, args }, queryOptions);
    const memoRender = useMemo(() => render(queryResult), [queryResult]);
    return <Fragment>{memoRender}</Fragment>;
  });

  return <Render />;
};
