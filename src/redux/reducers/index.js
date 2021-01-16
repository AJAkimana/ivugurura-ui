import { combineReducers } from 'redux';
import { categoryAddReducer, categoryReducer } from './categoryReducer';
import { languageReducer } from './languageReducer';
import { topicReducer } from './topicReducer';
import {
	topicAddReducer,
	topicEditReducer,
	topicGetReducer
} from './oneTopicReducer';
import { filePathReducer, filerReducer } from './filerReducer';
import { logoutUserReducer, useReducer } from './userReducer';
import { dashboardReducer } from './dashboardReducer';
import {
	commentReducer,
	commentsTopicReducer,
	adminCommentsReducer,
	publishCommentReducer
} from './commentReducer';
import { oneCategoryReducer } from './oneCategoryReducer';
import { searchReducer } from './searchReducer';
import { albumReducer } from './albumReducer';
import { mediaReducer, songDelReducer, songEditReducer } from './mediaReducer';
import {
	addCommuniqueReducer,
	getCommuniquesReducer,
	getPubCommuniqueReducer,
	publishCommuniqueReducer
} from './communiqueReducer';
import {
	chatGetReducer,
	chatUsersGetReducer,
	contactUsReducer
} from './utilReducer';

export const rootReducer = combineReducers({
	category: categoryReducer,
	language: languageReducer,
	topic: topicReducer,
	topicGet: topicGetReducer,
	topicAdd: topicAddReducer,
	topicEdit: topicEditReducer,
	filer: filerReducer,
	user: useReducer,
	lgUser: logoutUserReducer,
	dashboard: dashboardReducer,
	comment: commentReducer,
	oneCategory: oneCategoryReducer,
	search: searchReducer,
	album: albumReducer,
	media: mediaReducer,
	communiqueAdd: addCommuniqueReducer,
	communiqueGet: getCommuniquesReducer,
	communiquePub: getPubCommuniqueReducer,
	communiquePublish: publishCommuniqueReducer,
	topicComments: commentsTopicReducer,
	adminComments: adminCommentsReducer,
	publishComment: publishCommentReducer,
	contactUs: contactUsReducer,
	categoryAdd: categoryAddReducer,
	chatGet: chatGetReducer,
	chatUsersGet: chatUsersGetReducer,
	songDel: songDelReducer,
	songEdit: songEditReducer,
	filePath: filePathReducer
});
