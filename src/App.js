import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card } from "react-bootstrap";

import "./App.css";

function App() {
  const [userInput, setUserInput] = useState();

  const [sortField, setSortField] = useState();

  const [sortBy, setSortBy] = useState();

  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleButton = async () => {
    console.log("!Clicked", userInput);
    await fetch(
      `https://api.github.com/search/repositories?q=${userInput}&per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.items);
      });
  };

  const sortfieldchange = (e) => {
    setSortField(e.target.value);
  };

  const sortBychange = (e) => {
    let sorted;
    setSortBy(e.target.value);

    if (sortField == "name") {
      if (e.target.value == "ASC") {
        sorted = data.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else {
        sorted = data.sort((a, b) => (a.name > b.name ? -1 : 1));
      }
    } else if (sortField == "created_at") {
      if (e.target.value == "ASC") {
        sorted = data.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
      } else {
        sorted = data.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
      }
    } else if (sortField == "updated_at") {
      if (e.target.value == "ASC") {
        sorted = data.sort((a, b) => (a.updated_at > b.updated_at ? 1 : -1));
      } else {
        sorted = data.sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1));
      }
    } else if (sortField == "stargazers_count") {
      if (e.target.value == "ASC") {
        sorted = data.sort((a, b) =>
          a.stargazers_count > b.stargazers_count ? 1 : -1
        );
      } else {
        sorted = data.sort((a, b) =>
          a.stargazers_count > b.stargazers_count ? -1 : 1
        );
      }
    } else if (sortField == "watchers_count") {
      if (e.target.value == "ASC") {
        sorted = data.sort((a, b) =>
          a.watchers_count > b.watchers_count ? 1 : -1
        );
      } else {
        sorted = data.sort((a, b) =>
          a.watchers_count > b.watchers_count ? -1 : 1
        );
      }
    } else if (sortField == "score") {
      if (e.target.value == "ASC") {
        sorted = data.sort((a, b) => (a.score > b.score ? 1 : -1));
      } else {
        sorted = data.sort((a, b) => (a.score > b.score ? -1 : 1));
      }
    } else {
      sorted = data;
    }
  };

  return (
    <div>
      <div className="search">
        <input placeholder="Name" name="name" onChange={handleSearch}></input>
        <button onClick={handleButton}>Clickme</button>

        <select id="sortField" onChange={sortfieldchange}>
          <option value="name">Name</option>
          <option value="stargazers_count">Stars</option>
          <option value="watchers_count">Watchers</option>
          <option value="score">Score</option>
          <option value="created_at">Created</option>
          <option value="updated_at">Updated</option>
        </select>

        <select id="sortBy" onChange={sortBychange}>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      <Container>
        <div className="row">
          {data.length ? (
            data.map((items, i) => (
              <div key={i} className="col-3">
                <Card>
                  <Card.Img
                    variant="top"
                    src={items.owner.avatar_url}
                    height="auto;"
                    width="50px;"
                  />
                  <Card.Body>
                    <Card.Text>Repo Name: {items.name}</Card.Text>
                    <Card.Text> Stars: {items.stargazers_count} </Card.Text>
                    <Card.Text> Language: {items.language}</Card.Text>
                    <Card.Text> Description: {items.description} </Card.Text>
                    <Card.Text> Created At: {items.created_at} </Card.Text>
                    <Card.Text> Updated At: {items.updated_at} </Card.Text>
                    <Card.Text>
                      {" "}
                      Watchers Count: {items.watchers_count}{" "}
                    </Card.Text>
                    <Card.Text> Score: {items.score} </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h6>Welcome</h6>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
