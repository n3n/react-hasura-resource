/**
 * 
 * @param tableName 
 */
export function parse(tableName: string): { schema: string; tableName: string; } {
  const split = tableName.split('.');
  if (split.length === 1) {
    return { schema: 'public', tableName }
  }
  const [schema, _tableName] = split;
  return { schema, tableName: _tableName } ;
}

export function cloneQuery(query: object) {
  return JSON.parse(JSON.stringify(query));
};