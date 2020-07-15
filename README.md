<a href="https://www.npmjs.com/package/react-hasura-resource"><img src="https://img.shields.io/npm/v/react-hasura-resource.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/react-hasura-resource"><img src="https://img.shields.io/npm/l/react-hasura-resource.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/react-hasura-resource"><img src="https://img.shields.io/npm/dm/react-hasura-resource.svg" alt="NPM Downloads" /></a>
<a href="https://www.npmjs.com/package/react-hasura-resource"><img src="https://img.shields.io/bundlephobia/min/react-hasura-resource.svg" alt="Minified Size" /></a>
<a href="https://www.npmjs.com/package/react-hasura-resource"><img src="https://img.shields.io/bundlephobia/minzip/react-hasura-resource.svg" alt="Minzipped Size" /></a>

## Description

React Hasura Resource

## Installation

```bash
$ yarn add react-hasura-resource
```

## Example

```typescript
import { ReactHasuraResourceContext } from 'react-hasura-resource';

const hasuraResourceConfig: HasuraResourceContextState = {
  endpoint: 'https://react-hasura-resource-data.herokuapp.com',
  config: {
    primaryKey: {}
  }
}

const App = () => (
  <HasuraResourceContext.Provider value={hasuraResourceConfig}>
    <HasuraResourceList
      tableName="student"
      render={({ data, status }) => (
        status === 'success' ? (
          <ul>
            {data?.map(student => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )
      )}
    />
  </HasuraResourceContext.Provider>
)
```