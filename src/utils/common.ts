import axios from 'axios';

export const transformResponseData = (oldData: any) => {
  const data = oldData;

  if (Object.prototype.hasOwnProperty.call(data, '_id')) data.id = data._id;
  if (Object.prototype.hasOwnProperty.call(data, 'bandsIds')) data.bands = data.bandsIds;
  if (Object.prototype.hasOwnProperty.call(data, 'tracksIds')) data.tracks = data.tracksIds;
  if (Object.prototype.hasOwnProperty.call(data, 'genresIds')) data.genres = data.genresIds;
  if (Object.prototype.hasOwnProperty.call(data, 'artistsIds')) data.artists = data.artistsIds;
  if (Object.prototype.hasOwnProperty.call(data, 'userId')) data.id = data.userId;

  if (data.items) {
    for (const item of data.items) item.id = item._id;
  }

  return data;
};

export const transformRequestData = (oldData: any) => {
  const data = oldData;

  if (Object.prototype.hasOwnProperty.call(data, 'bands')) data.bandsIds = data.bands;
  if (Object.prototype.hasOwnProperty.call(data, 'tracks')) data.tracksIds = data.tracks;
  if (Object.prototype.hasOwnProperty.call(data, 'genres')) data.genresIds = data.genres;
  if (Object.prototype.hasOwnProperty.call(data, 'artists')) data.artistsIds = data.artists;

  return data;
};

export const moreRequestsById = async (ids: any, url: string) => {
  const responses = await Promise.all(
    ids.map((id: string) => axios.get(`${url}/${id}`)),
  );

  return responses
    .filter((res) => res.status === 200)
    .map((res) => transformResponseData(res.data));
};

export const errorHandler = (error: any) => {
  const { response: { data } } = error;
  if (data) {
    const { message } = data;
    if (message) return new Error(message);
  }
  return new Error(error.message);
};
