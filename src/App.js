import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const TITLE = 'React Graphql Github Client';
  
  const GET_ORGANIZATION = `
    {
      organization(login: "the-road-to-learn-react") {
        name
        url
      }
    }
  `;
  
  const [ path, setPath ] = useState({ 
    path: 'the-road-to-learn-react',
    url: 'the-road-to-learn-react'
  });

  const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${
        process.env.REACT_APP_GITHUB_PERSONALACCESS_TOKEN
      }`
    }
  })

  const onFetchFromGitHub = () => {
    axiosGitHubGraphQL
      .post('', { query: GET_ORGANIZATION })
      .then(result => console.log(result));
  };
  
  useEffect(() => {
    // fetch data
    onFetchFromGitHub();
  }, [onFetchFromGitHub]);

  const onChange = (e) =>
    setPath({
      ...path,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.prevetnDefault();
  }

  console.log(path);

  return (
    <div>
      <h1>{TITLE}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="url">
          Show open issues for https://github.com/
        </label>
        <input 
          id="url"
          type="text"
          name="url"
          value={path.url}
          onChange={onChange}
          style={{width: 300}}
        />
        <button type="submit">Search</button>
      </form>
      <hr/>
    </div>
  );
}

export default App;
