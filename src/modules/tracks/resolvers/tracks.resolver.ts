import { IID, IConfig } from '../../../utils/types';
import { ITrackDataPost, ITrackDataPut } from '../models/tracks.model';
import { TracksService } from '../services/tracks.service';

const Tracks = new TracksService();

export const resolver = {
  Query: {
    tracks: async (_, { limit = 5, offset = 0, filter = '' }) => {
      const data = await Tracks.tracks(limit, offset, filter);
      return data;
    },
    track: async (_, { id }: IID) => {
      const data = await Tracks.track(id);
      return data;
    },
  },
  Track: {
    album: async (parent) => {
      const data = await Tracks.album(parent);
      return data;
    },
    artists: async (parent) => {
      const data = await Tracks.artists(parent);
      return data;
    },
    bands: async (parent) => {
      const data = await Tracks.bands(parent);
      return data;
    },
    genres: async (parent) => {
      const data = await Tracks.genres(parent);
      return data;
    },
  },
  Mutation: {
    createTrack: async (_, content: ITrackDataPost, context: IConfig) => {
      const data = await Tracks.createTrack(content, context);
      return data;
    },
    updateTrack: async (_, content: ITrackDataPut, context: IConfig) => {
      const data = await Tracks.updateTrack(content, context);
      return data;
    },
    deleteTrack: async (_, { id }: IID, context: IConfig) => {
      const data = await Tracks.deleteTrack(id, context);
      return data;
    },
  },
};
