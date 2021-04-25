import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { Main, AdminMain } from './layouts';

export const routes = [
	{
		path: '/admin',
		component: AdminMain,
		routes: [
			{
				path: '/admin',
				exact: true,
				component: lazy(() => import('views/Dashboard'))
			},
			{
				path: '/admin/add-topic',
				exact: true,
				component: lazy(() => import('views/AddEditTopic'))
			},
			{
				path: '/admin/audios',
				exact: true,
				component: lazy(() => import('views/AdminAudio'))
			},
			{
				path: '/admin/users',
				exact: true,
				component: lazy(() => import('views/SystemUsers'))
			},
			{
				path: '/admin/setting',
				exact: true,
				component: lazy(() => import('views/AdminSetting'))
			},
			{
				path: '/admin/commentaries',
				exact: true,
				component: lazy(() => import('views/AdminCommentaries'))
			},
			{
				path: '/admin/edit-topic/:topicSlug',
				exact: true,
				component: lazy(() => import('views/AddEditTopic'))
			},
			{
				component: () => <Redirect to='/' />
			}
		]
	},
	{
		path: '/',
		component: Main,
		routes: [
			{
				path: '/',
				exact: true,
				component: lazy(() => import('views/Home'))
			},
			{
				path: '/login',
				exact: true,
				component: lazy(() => import('views/Login'))
			},
			{
				path: '/topics',
				exact: true,
				component: lazy(() => import('views/ViwTopics'))
			},
			{
				path: '/topics/:topicSlug',
				exact: true,
				component: lazy(() => import('views/TopicView'))
			},
			{
				path: '/topics/categories/:categorySlug',
				exact: true,
				component: lazy(() => import('views/ViwTopics'))
			},
			{
				path: '/radio',
				exact: true,
				component: lazy(() => import('views/RadioRRV'))
			},
			{
				path: '/audios',
				exact: true,
				component: lazy(() => import('views/Audios'))
			},
			{
				path: '/errors/error-400',
				exact: true,
				component: lazy(() => import('views/NotFound'))
			},
			{
				component: () => <Redirect to='/' />
			}
		]
	}
];
