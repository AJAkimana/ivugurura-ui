import React, { useEffect, useState } from 'react';
import { fromString } from 'html-to-text';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardTopics, updateTopic } from '../redux/actions/topics';
import { Loading, ActionButtons } from './common';
import { truncate, formatDate } from '../utils/constants';
import { ActionConfirm } from './models';
import { toast } from 'react-toastify';

export const DraftPosts = ({ history }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({ title: 'title' });
  const [btnAction, setBtnAction] = useState('');
  const topicType = 'unPublished';
  const pageSize = 3;
  const { dashboard, oneTopic } = useSelector(({ dashboard, oneTopic }) => ({
    dashboard,
    oneTopic,
  }));
  const { unPublished, unPublishedLoading } = dashboard;
  const { topicUpdated } = oneTopic;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getDashboardTopics(topicType, currentPage, pageSize));
    if (topicUpdated) {
      setShow(false);
      dispatch(getDashboardTopics(topicType, currentPage, pageSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, getDashboardTopics, topicUpdated]);

  const onChangePaginate = (action) => {
    let currentLocation =
      action === 'next'
        ? currentPage + 1
        : currentPage === 1
        ? 1
        : currentPage - 1;
    setCurrentPage(currentLocation);
  };
  const prevDisabled = currentPage === 1 ? 'disabled' : '';
  const nextDisabled = !unPublished.length ? 'disabled' : '';
  const onTopicSetCurrent = (theTopic, action) => {
    setCurrentTopic(theTopic);
    setBtnAction(action);
    setShow(true);
  };
  return (
    <>
      <ActionConfirm
        title='Action modal'
        description={currentTopic.title}
        show={show}
        action={btnAction}
        onHide={() => setShow(false)}
        onAction={() =>
          dispatch(updateTopic({ isPublished: true }, currentTopic.slug))
        }
      />
      <div class='recent-updates card'>
        <div class='card-header'>
          <h3 class='h4'>Draft topics</h3>
        </div>
        <div class='card-body no-padding'>
          {unPublishedLoading ? (
            <Loading />
          ) : unPublished.length ? (
            unPublished.map((topic, topicIndex) => (
              <div class='item d-flex justify-content-between' key={topicIndex}>
                <div class='info d-flex'>
                  <div class='icon'>
                    <i class='icon-rss-feed'></i>
                  </div>
                  <div class='title'>
                    <h5>{topic.title}</h5>
                    <p>
                      {truncate(
                        fromString(topic.content, { wordwrap: 70 }),
                        120
                      )}
                    </p>
                    <ActionButtons
                      onDelete={() => onTopicSetCurrent(topic, 'delete')}
                      status={topic.isPublished ? 'Unpublish' : 'Publish'}
                      onEdit={() =>
                        history.push(`/admin/edit-topic/${topic.slug}`)
                      }
                      onPublish={() => onTopicSetCurrent(topic, 'publish')}
                      isTopic
                    />
                  </div>
                </div>
                <div class='date text-right'>
                  <span>{formatDate(topic.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <h6 className='text-info text-center'>No drafts topics</h6>
          )}
        </div>
        <div className='card-footer no-padding'>
          <nav aria-label='Page navigation example'>
            <ul className='pagination justify-content-end'>
              <li
                className={`page-item ${prevDisabled}`}
                onClick={() => onChangePaginate('prev')}
              >
                <button className='page-link btn-link'>Previous</button>
              </li>
              <li
                onClick={() => onChangePaginate('next')}
                className={`page-item ${nextDisabled}`}
              >
                <button className='page-link btn-link'>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
