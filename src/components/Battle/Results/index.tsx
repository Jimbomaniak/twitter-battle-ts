import React, { Component } from 'react';
import qs from 'qs';
import { api } from '../../../utils/';
import { Link } from 'react-router-dom';
import PlayerPreview from '../PlayerPreview';
import Loading from '../../Loading';

interface IInfo<T> {
  avatar_url: T;
  login: T;
  html_url: T;
  name: T;
  location: T;
  company: T;
  followers: T;
  following: T;
  public_repos: T;
  blog: T;
}

interface ProfileProps {
  info: IInfo<string>;
}

interface PlayerProps {
  label: string;
  score: number;
  profile: IInfo<string>;
}

interface ILocation {
  search: string;
}

export interface IProfile {
  profile: IInfo<string>;
}

interface ResultsProps {
  location: ILocation;
}

interface IPlayer {
  score: number;
  profile: IProfile;
}

interface ResultsState {
  winner: null | IPlayer;
  loser: null | IPlayer;
  error: null | string;
  loading: boolean;
}

const Profile = (props: ProfileProps) => {
  const {
    avatar_url,
    login,
    html_url,
    name,
    location,
    company,
    followers,
    following,
    public_repos,
    blog
  } = props.info;

  return (
    <PlayerPreview avatar={avatar_url} username={login} userurl={html_url}>
      <ul className="space-list-items">
        {name && <li>{name}</li>}
        {location && <li>{location}</li>}
        {company && <li>{company}</li>}
        <li>Followers: {followers}</li>
        <li>Following: {following}</li>
        <li>Public Repos: {public_repos}</li>
        {blog && (
          <li>
            <a href={blog}>{blog}</a>
          </li>
        )}
      </ul>
    </PlayerPreview>
  );
};

const Player = (props: PlayerProps) => (
  <div>
    <h1 className="header"> {props.label}</h1>
    {props.score && (
      <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
    )}
    {props.profile && <Profile info={props.profile} />}
  </div>
);

class Results extends Component<ResultsProps, ResultsState> {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  };

  componentDidMount() {
    const players = qs.parse(this.props.location.search.slice(1));
    api.battle([players.playerOneName, players.playerTwoName]).then(results => {
      if (results === null) {
        return this.setState({
          error:
            'Looks like there was error. Check that both users exist on GitHub',
          loading: false
        });
      }
      this.setState({
        error: null,
        winner: results[0],
        loser: results[1],
        loading: false
      });
    });
  }

  render() {
    const { error, winner, loser, loading } = this.state;

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="TwitterBattle/battle">Reset</Link>
        </div>
      );
    }
    if (!winner || !loser) {
      return (
        <div>
          <p> No data </p>
        </div>
      );
    }

    return (
      <div className="players">
        <div className="row">
          <Player
            label="Winner"
            score={(winner as any).score}
            profile={(winner as any).profile}
          />
          <Player label="Loser" score={(loser as any).score} profile={(loser as any).profile} />
        </div>
      </div>
    );
  }
}

export default Results;
