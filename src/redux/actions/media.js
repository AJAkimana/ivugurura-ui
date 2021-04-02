import {
	GET_MEDIAS,
	ADD_NEW_MEDIA,
	DOWNLOAD_SONG,
	EDIT_SONG,
	DELETE_SONG,
	SHARE_SONG
} from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const getMedias = (type = 'all', page = 1, pageSize = 5) => {
	const params = `page=${page}&pageSize=${pageSize}`;
	store.dispatch({
		type: GET_MEDIAS,
		payload: http.get(`/albums/medias/${type}?${params}`)
	});
};
export const addNewMedia = (media) => {
	store.dispatch({
		type: ADD_NEW_MEDIA,
		payload: http.post('/albums/add', media)
	});
};
export const downloadSong = (songId = '') => {
	store.dispatch({
		type: DOWNLOAD_SONG,
		payload: http.get(`/albums/download/${songId}`)
	});
};
export const editSong = (songId = '', songBody = {}) => {
	delete songBody.id;
	store.dispatch({
		type: EDIT_SONG,
		payload: http.patch(`/albums/media/${songId}`, songBody)
	});
};
export const deleteSong = (songId = '') => {
	store.dispatch({
		type: DELETE_SONG,
		payload: http.delete(`/albums/media/${songId}/del`)
	});
};
export const shareSong = (songId = '') => {
	store.dispatch({
		type: SHARE_SONG,
		payload: http.get(`/albums/share/${songId}`)
	});
};
