import axios from 'axios';

interface IID {
  _id: string
}

export const resolver = {
  Query: {
    artists: async () => {
      const artistsUrl = process.env.ARTISTS_URL || '';
      const { data } = await axios.get(artistsUrl);
      return data.items;
    },
    artist: async (_: any, { _id }: IID) => {
      const artistsUrl = process.env.ARTISTS_URL || '';
      const { data } = await axios.get(`${artistsUrl}/${_id}`);
      return data;
    },
  },
};
