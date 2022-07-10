import axios from 'axios';
import { IConfig } from '../../../utils/types';
import {
  favouritesUrl, bandsUrl, genresUrl, artistsUrl, tracksUrl,
} from '../../../utils/constants';
import { transformResponseData, errorHandler, moreRequestsById } from '../../../utils/common';

export class FavouritesService {
  async favourites(context: IConfig) {
    const { data } = await axios.get(favouritesUrl, context.config);
    const newData = transformResponseData(data);
    return newData;
  }

  async bands(parent) {
    const result = { ...parent };
    if (parent.bandsIds) {
      result.bands = await moreRequestsById(parent.bandsIds, bandsUrl);
    }
    return result.bands;
  }

  async genres(parent) {
    const result = { ...parent };
    if (parent.genresIds) {
      result.genres = await moreRequestsById(parent.genresIds, genresUrl);
    }
    return result.genres;
  }

  async artists(parent) {
    const result = { ...parent };
    if (parent.artistsIds) {
      result.artists = await moreRequestsById(parent.artistsIds, artistsUrl);
    }
    return result.artists;
  }

  async tracks(parent) {
    const result = { ...parent };
    if (parent.tracksIds) {
      result.tracks = await moreRequestsById(parent.tracksIds, tracksUrl);
    }
    return result.tracks;
  }

  async addTrackToFavourites(id: string, context: IConfig) {
    try {
      const body = { id, type: 'tracks' };
      const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async addBandToFavourites(id: string, context: IConfig) {
    try {
      const body = { id, type: 'bands' };
      const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async addArtistToFavourites(id: string, context: IConfig) {
    try {
      const body = { id, type: 'artists' };
      const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async addGenreToFavourites(id: string, context: IConfig) {
    try {
      const body = { id, type: 'genres' };
      const { data } = await axios.put(`${favouritesUrl}/add`, body, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async removeTrackToFavourites(id: string, context: IConfig) {
    try {
      const body = { id, type: 'tracks' };
      const { data } = await axios.put(`${favouritesUrl}/remove`, body, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async removeBandToFavourites(id: string, context: IConfig) {
    try {
      const body = { id, type: 'bands' };
      const { data } = await axios.put(`${favouritesUrl}/remove`, body, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async removeArtistToFavourites(id: string, context: IConfig) {
    try {
      const body = { id, type: 'artists' };
      const { data } = await axios.put(`${favouritesUrl}/remove`, body, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async removeGenreToFavourites(id: string, context: IConfig) {
    try {
      const body = { id, type: 'genres' };
      const { data } = await axios.put(`${favouritesUrl}/remove`, body, context.config);
      const newData = transformResponseData(data);
      return newData;
    } catch (error) {
      throw errorHandler(error);
    }
  }
}
