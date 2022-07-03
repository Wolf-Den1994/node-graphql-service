export const transformData = (oldData: any) => {
  const data = oldData;

  if (Object.prototype.hasOwnProperty.call(data, '_id')) data.id = data._id;

  if (data.items) {
    for (const item of data.items) item.id = item._id;
  }

  return data;
};
