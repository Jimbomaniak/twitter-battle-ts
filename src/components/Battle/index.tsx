import React, { Component, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

interface PlayerInputProps {
  id: 'playerOne' | 'playerTwo';
  label: string;
  onSubmit(id: string, username: string): void;
}

interface PlayerInputState {
  username: string;
}

interface IValue {
  value: string;
}

interface ITarget {
  target: IValue;
}

interface IMatch {
  url: string;
}

interface BattleProps {
  match: IMatch;
}

interface BattleState {
  playerOneName: string;
  playerTwoName: string;
  playerOneImage: string;
  playerTwoImage: string;
}

class PlayerInput extends Component<PlayerInputProps, PlayerInputState> {
  state = {
    username: ''
  };

  handleChange = ({ target }: ITarget) => {
    this.setState({ username: target.value });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  };

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    );
  }
}

class Battle extends Component<BattleProps, BattleState> {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: '',
    playerTwoImage: ''
  };

  handleSubmit = (id: 'playerOne' | 'playerTwo', username: string) => {
    if (id === 'playerOne') {
      this.setState({
        playerOneName: username,
        playerOneImage: `https://github.com/${username}.png?size=200`
      });
    } else {
      this.setState({
        playerTwoName: username,
        playerTwoImage: `https://github.com/${username}.png?size=200`
      });
    }
  };

  handleReset = (id: 'playerOne' | 'playerTwo') => {
    if (id === 'playerOne') {
      this.setState({
        playerOneName: '',
        playerOneImage: ''
      });
    } else {
      this.setState({
        playerTwoName: '',
        playerTwoImage: ''
      });
    }
  };

  render() {
    const { match } = this.props;
    const {
      playerOneName,
      playerTwoName,
      playerOneImage,
      playerTwoImage
    } = this.state;

    return (
      <div className="players">
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}

          {!!playerOneImage && (
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              id="playerOne"
              userurl={`https://github.com/${playerOneName}`}>
              <button
                className="reset"
                onClick={this.handleReset.bind(null, 'playerOne')}>
                Reset
              </button>
            </PlayerPreview>
          )}

          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {!!playerTwoImage && (
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              id="playerTwo"
              userurl={`https://github.com/${playerTwoName}`}>
              <button
                className="reset"
                onClick={this.handleReset.bind(null, 'playerTwo')}>
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>
        {playerOneImage && playerTwoImage && (
          <Link
            className="button"
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }}>
            Battle
          </Link>
        )}
      </div>
    );
  }
}

export default Battle;
