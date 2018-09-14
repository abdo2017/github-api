import React, { Component } from "react";
import propTypes from "prop-types";
import api from "./utils/api";

// stateless function for languages in the navbar
function Select(props) {
  const languages = ["All", "Javascript", "Java", "Ruby", "Python", "CSS"];
  return (
    <ul className="languages">
      {languages.map(language => {
        return (
          <li
            style={
              language === props.selectedLang ? { color: "#d0021b" } : null
            }
            onClick={props.onselect.bind(null, language)}
            key={language}
          >
            {language}
          </li>
        );
      })}
    </ul>
  );
}

//stateless function ( RepoGrid )for github lists...
function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank"># {index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={"avatar for " + repo.owner.login}
                />
              </li>
              <a href={repo.html_url}>{repo.name}</a>
              <li />

              <li>@{repo.owner.login}</li>
              <li>{repo.startgazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

//proptypes for stateless functions
RepoGrid.propTypes = {
  repos: propTypes.array.isRequired
};

Select.propTypes = {
  selectedLang: propTypes.string.isRequired,
  onselect: propTypes.func.isRequired
};

// popular class
class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLang: "All"
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLang);
  }

  updateLanguage(lang) {
    this.setState(() => {
      return {
        selectedLang: lang,
        repos: null
      };
    });
    api.fetchPopularRepos(lang).then(result => {
      this.setState(() => {
        return {
          repos: result
        };
      });
    });
  }

  render() {
    return (
      <div>
        <Select
          selectedLang={this.state.selectedLang}
          onselect={this.updateLanguage}
        />

        {!this.state.repos ? (
          <p>loading</p>
        ) : (
          <RepoGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}

export default Popular;