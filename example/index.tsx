import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HasuraResourceContext, HasuraResource, HasuraResourceContextState, HasuraResourceList } from '../.';

const hasuraResourceConfig: HasuraResourceContextState = {
  endpoint: 'https://react-hasura-resource-data.herokuapp.com',
  config: {
    primaryKey: {}
  }
}

const App = () => {
  return (
    <HasuraResourceContext.Provider value={hasuraResourceConfig}>
      <h1>HasuraResource</h1>
      <HasuraResource
        id="bbfc3dff-e14c-466d-9ef9-62117fe58e60"
        tableName="student"
        args={{
          columns: ["*", { name: "course", columns: [ "name" ] }]
        }}
        render={(props) => {
          return (
            <React.Fragment>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </React.Fragment>
          )
        }}
      />
      <hr />
      <h1>HasuraResourceList</h1>
      <HasuraResourceList
        tableName="student"
        render={({ data, totalCount, status }) => (
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
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
