import axios from "axios"

const getAll = (url) => axios.get(url);

const updateItem = (url, id, obj) => axios.patch(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

export {getAll, updateItem, deleteItem};