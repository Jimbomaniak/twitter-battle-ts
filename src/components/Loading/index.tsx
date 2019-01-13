import React, { Component, CSSProperties } from 'react';

const content: CSSProperties = {
    textAlign: 'center',
    fontSize: '35px'
};

interface LoadingState {
  text: string;
}

interface LoadingProps {
  speed: number;
  text: string;
}

class Loading extends Component<LoadingProps, LoadingState> {
  static defaultProps = {
    text: 'Loading',
    speed: 300
  }
  public interval: number = 0;
  state = {
    text: this.props.text
  };

  componentDidMount() {
    const stopper = `${this.props.text}...`;
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({ text: this.props.text });
      } else {
        this.setState(prevState => {
          return { text: prevState.text + '.' };
        });
      }
    }, this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return <p style={content}>{this.state.text}</p>;
  }
}


export default Loading;
