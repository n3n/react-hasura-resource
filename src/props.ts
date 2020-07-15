import { QueryOptions } from 'react-query';

export type FetchStatus = 'loading' | 'success' | 'error' | 'idle';

export type Operator =
  | '_eq'
  | '_neq'
  | '_gt'
  | '_lt'
  | '_gte'
  | '_lte'
  | '_in'
  | '_nin'
  | '_like'
  | '_nlike'
  | '_ilike'
  | '_nilike'
  | '_similar'
  | '_nsimilar'
  | '_is_null'
  | '_cast'
  | '_contains'
  | '_contained_in'
  | '_has_key'
  | '_has_keys_any'
  | '_has_keys_all'
  | '_st_contains'
  | '_st_crosses'
  | '_st_equals'
  | '_st_intersects'
  | '_st_overlaps'
  | '_st_touches'
  | '_st_within'
  | '_st_d_within'
  | '_st_intersects_rast'
  | '_st_intersects_nband_geom'
  | '_st_intersects_geom_nband';

export interface BaseHasuraRenderProps<T> {
  data: T | undefined;
  status: FetchStatus;
  error?: Error | null;
}

export type HasuraQueryWhereOperator = {
  [key in Operator]: Partial<HasuraQueryWherePartial>;
};

export type HasuraQueryWhereString = {
  [key: string]: Partial<HasuraQueryWherePartial>;
};

export type HasuraQueryWherePartial = string | HasuraQueryWhereOperator | HasuraQueryWhereString;

export type HasuraQueryWhere = Partial<{
  [key: string]: Partial<HasuraQueryWherePartial>;
}>;

export interface HasuraQueryArgs {
  where?: HasuraQueryWhere;
  columns?: HasuraQueryColumn[];
}

export interface HasuraQueryColumnRelationship {
  name: string;
  columns: HasuraQueryColumn[];
  alias?: string;
  where?: HasuraQueryWhere;
}

export type HasuraQueryColumn = string | HasuraQueryColumnRelationship;

// Resource

export interface HasuraResourceRenderProps<T extends Object = object> extends BaseHasuraRenderProps<T> {
  data: T | undefined;
  status: FetchStatus;
  error?: Error | null;
}

export interface HasuraResourceProps {
  id: string | number;
  tableName: string;
  args?: HasuraQueryArgs;
  render: (props: HasuraResourceRenderProps) => JSX.Element;
  queryOptions?: QueryOptions<object>;
}

export interface BaseGetResourceHookProps {
  id: string | number;
  tableName: string;
  args?: HasuraQueryArgs;
}

export interface GetResourceFnProps extends BaseGetResourceHookProps {
  endpoint: string;
  primaryKey: string;
  headers: any;
}

// Resource List

export interface HasuraResourceListRenderProps<T extends any[] | [] = object[]> extends BaseHasuraRenderProps<T> {
  totalCount: number;
}

export interface HasuraQueryListArgs extends HasuraQueryArgs {
  pagination?: {
    perPage: number;
    page: number;
  };
  sort?: {
    field: string;
    order?: 'asc' | 'desc';
  };
}

export interface HasuraResourceListProps {
  tableName: string;
  render: (props: HasuraResourceListRenderProps) => JSX.Element;
  queryOptions?: QueryOptions<[object[], { count: number }]>;
  args?: HasuraQueryListArgs;
}

export interface BaseGetResourceListHookProps {
  tableName: string;
  args?: HasuraQueryListArgs;
}

export interface GetResourceListFnProps extends BaseGetResourceListHookProps {
  endpoint: string;
  primaryKey: string;
  headers: any;
}
