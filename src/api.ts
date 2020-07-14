import {
  selectQuery, countQuery, bulkQuery,
} from "./queries";
import { GetResourceFnProps, GetResourceListFnProps, HasuraQueryArgs } from './props';
import { parse, cloneQuery } from './utils';
import { DEFAULT_COLUMNS_PROP } from './constants';

const addFilters = (where: HasuraQueryArgs['where'], filter: HasuraQueryArgs['where']) => {
  if (!filter) return where;

  const filterKeys = Object.keys(filter);

  if (filterKeys.length === 0) return where;

  const whereCopy: HasuraQueryArgs['where'] = Object.assign(where!);

  filterKeys.forEach((key) => {
    whereCopy![key] = filter[key];
  });
  return whereCopy;
};

export async function getResource<TResult = unknown>(_key: string, params: GetResourceFnProps): Promise<TResult | null> {
  const finalQuery: any = cloneQuery(selectQuery);
  const { primaryKey, tableName: _tableName, id, args } = params
  const { schema, tableName } = parse(_tableName)

  finalQuery.args.table = { 'name': tableName, 'schema': schema };
  finalQuery.args.columns = args?.columns || DEFAULT_COLUMNS_PROP;
  finalQuery.args.where = args?.where || {};
  finalQuery.args.where[primaryKey] = { '$eq': id };

  const response = await fetch(params.endpoint + '/v1/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...params.headers,
    },
    body: JSON.stringify(finalQuery)
  })

  try {
    const data = await response.json() as TResult[];
    return data.length ? data[0] : null;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
}

export async function getResourceList<TResult = unknown[]>(_key: string, params: GetResourceListFnProps): Promise<TResult | null> {
  let finalQuery: any = {};
  const finalSelectQuery = cloneQuery(selectQuery);
  const finalCountQuery = cloneQuery(countQuery);
  const { primaryKey, tableName: _tableName, args = {} } = params
  const { schema, tableName } = parse(_tableName)
  const { 
    pagination = { perPage: 20, page: 1 },
    sort = { field: [primaryKey], order: 'asc' },
  } = args;

  finalSelectQuery.args.table = { 'name': tableName, 'schema': schema };
  finalSelectQuery.args.columns = args.columns || DEFAULT_COLUMNS_PROP;
  finalSelectQuery.args.where = args.where || {};
  finalSelectQuery.args.limit = pagination.perPage || 20;
  finalSelectQuery.args.offset = (pagination.page * pagination.perPage) - pagination.perPage;
  finalSelectQuery.args.order_by = { column: sort.field, type: typeof sort.order === 'undefined' ? 'asc' : sort.order.toLowerCase() };
  finalCountQuery.args.table = { 'name': tableName, 'schema': schema };;
  finalCountQuery.args.where = {};
  finalCountQuery.args.where[primaryKey] = { '$ne': null };
  finalCountQuery.args.where = addFilters(finalCountQuery.args.where, args.where);
  finalQuery = cloneQuery(bulkQuery);
  finalQuery.args.push(finalSelectQuery);
  finalQuery.args.push(finalCountQuery);

  const response = await fetch(params.endpoint + '/v1/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...params.headers,
    },
    body: JSON.stringify(finalQuery)
  })

  try {
    const data = await response.json() as TResult;
    return data;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
}
