import axios from 'axios';
import { IInfo } from '../components/Battle/Results'

const id = '85765946457c8c2c2885';
const sec = '9a4ad3b170b6b727802fe674c230198bb39bf0fe';
const params = `?client_id=${id}&client_secret=${sec}`;
const url = 'https://api.github.com/users/'

interface Repo {
  stargazers_count: number
}

interface Repos {
  data: Repo[],
}

interface Profile {
  followers: number
}

export interface IPlayer {
  score: number,
  profile: IInfo<string>
}

const getProfile = (username: string) =>
  axios.get(`${url}${username + params}`)
    .then((user) => user.data);


const getRepos = (username: string) =>
  axios.get(`${url}${username}/repos${params}&per_page=100`)


const getStarCount  = (repos: Repos) =>
  repos.data.reduce((count: number, repo) => count + repo.stargazers_count, 0)


const calculateScore = (profile: Profile, repos: Repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

const handleError = (error: Error) => {
  console.warn(error);
  return null;
}

const getUserData = (player: string) =>
 axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile,
      score: calculateScore(profile, repos)
    }
  })

interface Window {
  encodeURI(uri: string): string;
  // поидее это должно было сработать, но нет...
}

const sortPlayers = (players: IPlayer[]) =>
  players.sort((a, b) => b.score - a.score);

export const api = {
  battle: (players: string[]) =>
    axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  ,
  fetchPopularRepos: (language: string) => {
    const SEARCHURL = 'https://api.github.com/search/repositories?q=stars:>1+language:'+
      language + '&sort=stars&order=desc&type=Repositories';
    const encodedURI = (window as any).encodeURI(SEARCHURL);

    return axios.get(encodedURI)
      .then(resp => resp.data.items)
  }
};




