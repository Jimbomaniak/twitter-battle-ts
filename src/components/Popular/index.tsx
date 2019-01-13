import React, { Component } from 'react';
import { api } from '../../utils';
import Loading from '../Loading';

const LANGUAGES = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

interface SelectLanguageProps {
  selectedLanguage: string;
  onSelect(lang: string): void;
}

interface IOwner {
  avatar_url: string;
  login: string;
}

interface IRepo {
  name: string;
  html_url: string;
  owner: IOwner;
  stargazers_count: string;
}

interface RepoGridProps {
  repos: IRepo[];
}

interface PopularState {
  selectedLanguage: string,
  repos: IRepo[]
}

const SelectLanguage = (props: SelectLanguageProps) => (
  <ul className="languages">
    {LANGUAGES.map(lang => (
      <li
        style={
          lang === props.selectedLanguage ? { color: '#d0021b' } : undefined
        }
        onClick={props.onSelect.bind(null, lang)}
        key={lang}>
        {lang}
      </li>
    ))}
  </ul>
);

const RepoGrid = (props: RepoGridProps) => (
  <ul className="popular-list">
    {props.repos.map((repo, index) => {
      return (
        <li key={repo.name} className="popular-item">
          <div className="popular-rank"> #{index + 1}</div>
          <ul className="space-list-items">
            <li>
              <a href={repo.html_url} target="_blank">
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </a>
            </li>
            <li>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      );
    })}
  </ul>
);


class Popular extends Component<PopularState> {
  state = {
    selectedLanguage: 'All',
    repos: null
  };

  componentDidMount() {
    console.log('------', 'mount');
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (lang: string) => {
    this.setState({
      selectedLanguage: lang,
      repos: null
    });

    api.fetchPopularRepos(lang).then(repos => this.setState({ repos }));
  };

  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div className="popular">
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos ? (
          <Loading text="Downloading" />
        ) : (
          <RepoGrid repos={repos} />
        )}
      </div>
    );
  }
}

export default Popular;
