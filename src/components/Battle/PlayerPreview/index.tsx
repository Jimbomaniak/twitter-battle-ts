import React, { ReactNode } from 'react';

interface PlayerPreviewProps {
  avatar: string;
  username: string;
  userurl: string;
  children: ReactNode;
  id?: string;
}

const PlayerPreview = (props: PlayerPreviewProps) => (
  <div>
    <div className="column">
      <a href={props.userurl} target="_blank">
        <img
          className="avatar"
          src={props.avatar}
          alt={`Avatar for ${props.username}`}
        />
      </a>
      <h2 className="username">{`@${props.username}`}</h2>
    </div>
    {props.children}
  </div>
);

export default PlayerPreview;
