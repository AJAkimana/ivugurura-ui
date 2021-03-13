import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Pagination from 'react-bootstrap-4-pagination';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { ButtonGroup, Card, Button, Badge } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getMedias } from '../redux/actions';
import { Loading } from './common';
import { audioPath } from '../helpers/utils';
import { truncate } from '../utils/constants';

const initialPaginate = { pageSize: 5, pageNumber: 1 };
export const AudioPlayer = ({
	trancNumber = 12,
	notOnlyIcon = false,
	withPaginations = false
}) => {
	const [currentAudio, setCurrentAudio] = useState({});
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [paginator, setPaginator] = useState(initialPaginate);

	const { medias, mediasFetching, totalItems } = useSelector(
		({ media }) => media
	);
	useEffect(() => {
		const { pageNumber, pageSize } = paginator;
		getMedias('audio', pageNumber, pageSize);
	}, [paginator]);
	useEffect(() => {
		if (medias.length) {
			setCurrentAudio(medias[0]);
		}
	}, [medias]);
	useEffect(() => {
		if (currentAudio.id) {
			const theIndex = medias.findIndex((m) => m.id === currentAudio.id);
			setCurrentIndex(theIndex);
		}
	}, [currentAudio, medias]);
	const customControls = [
		RHAP_UI.LOOP,
		<Button
			size='sm'
			disabled={currentIndex === 0}
			onClick={() => setCurrentAudio(medias[currentIndex - 1])}
		>
			<i className='fa fa-step-backward'></i>
		</Button>,
		<Button
			size='sm'
			disabled={currentIndex === medias.length - 1}
			onClick={() => setCurrentAudio(medias[currentIndex + 1])}
		>
			<i className='fa fa-step-forward'></i>
		</Button>
	];
	const BASE_DOWNLOAD = process.env.REACT_APP_API_URL.includes('localhost')
		? `${process.env.REACT_APP_API_URL}`
		: '';
	const DL_ROUTE = BASE_DOWNLOAD + '/api/v1/albums/download/';

	const onPageChage = (currentPage) => {
		setPaginator({ ...paginator, pageNumber: currentPage });
	};
	return (
		<Card>
			<H5AudioPlayer
				muted
				src={audioPath + currentAudio.mediaLink}
				customAdditionalControls={customControls}
			/>
			<Card.Body>
				<Card.Text>
					{currentAudio.title} by {currentAudio.author}{' '}
					<Badge pill variant='info'>
						{moment(currentAudio.actionDate).format('dddd, MMM DD, YYYY')}
					</Badge>
				</Card.Text>
			</Card.Body>
			<ListGroup className='list-group-flush'>
				{mediasFetching && !medias.length ? (
					<Loading />
				) : medias.length ? (
					<div style={{ overflow: 'auto' }}>
						{medias.map((media, mediaIndex) => (
							<ListGroupItem
								variant={media.id === currentAudio.id ? 'primary' : 'danger'}
								key={mediaIndex}
							>
								{`${truncate(media.title, 25)} ${
									media.author !== null
										? '--' + truncate(media.author, trancNumber)
										: ''
								}`}
								<ButtonGroup
									size='sm'
									aria-label='Actions buttons'
									className='pull-right'
								>
									<Button size='sm' onClick={() => setCurrentAudio(media)}>
										<i className='fa fa-play'></i> {notOnlyIcon && 'Play'}
									</Button>
									<a
										className='btn btn-sm btn-info'
										rel='noreferrer'
										href={DL_ROUTE + media.id}
										target='_blank'
									>
										<i className='fa fa-download'></i>
										{notOnlyIcon && 'Download'}
									</a>
								</ButtonGroup>
							</ListGroupItem>
						))}
					</div>
				) : null}
			</ListGroup>
			<Card.Footer>
				{withPaginations && totalItems > 0 && (
					<Pagination
						totalPages={Math.ceil(totalItems / paginator.pageSize)}
						currentPage={paginator.pageNumber}
						prevNex
						threeDots
						size='sm'
						onClick={onPageChage}
					/>
				)}
			</Card.Footer>
		</Card>
	);
};
