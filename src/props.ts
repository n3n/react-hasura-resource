import { QueryOptions } from 'react-query'

export type FetchStatus = "loading" | "success" | "error" | "idle"

export type HasuraResourceRenderProps<T = object> = {
  data: T | undefined;
  status: FetchStatus;
  error?: Error | null;
}

export interface HasuraResourceListRenderProps<T = object[]> extends HasuraResourceRenderProps<T> {
  totalCount: number;
}

export type HasuraQueryColumnRelationship = {
  name: string;
  columns: HasuraQueryColumn[];
}

export type HasuraQueryColumn = string | HasuraQueryColumnRelationship

export type HasuraQueryArgs = {
  where?: {
    [key: string]: string;
  };
  columns?: HasuraQueryColumn[];
}

// Resource

export type HasuraResourceProps = {
  id: string | number;
  tableName: string;
  args?: HasuraQueryArgs;
  render: (props: HasuraResourceRenderProps) => JSX.Element;
  queryOptions?: QueryOptions<object>
}

export type BaseGetResourceHookProps = {
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

export type HasuraResourceListProps = {
  tableName: string;
  render: (props: HasuraResourceListRenderProps) => JSX.Element;
  queryOptions?: QueryOptions<[object[], { count: number; }]>
  args?: HasuraQueryListArgs;
}

export type BaseGetResourceListHookProps = {
  tableName: string;
  args?: HasuraQueryListArgs;
}

export interface GetResourceListFnProps extends BaseGetResourceListHookProps {
  endpoint: string;
  primaryKey: string;
  headers: any;
}