import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StoriesIndex from './stories_index';
import { fetchSingleFeed } from '../../../actions/subscription_actions';
import { fetchUnsubscribedFeed } from '../../../actions/story_actions';


const mapStateToProps = (state, ownProps) => {
  const storiesState = state.entities.stories.byId;
  const feeds = state.entities.feeds.byId;
  const id = ownProps.match.params.id;

  let feed = feeds[id];
  feed = (!feed || !feed.stories) ?
    {stories: [], subscription_title: ""} :
    feed;

  const stories = feed.stories.map(storyId => storiesState[storyId]);

  return ({
    title: feed.subscription_title,
    stories,
    feeds,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {

  const fetchAction = ownProps.match.path.split('/')[2] === "discover" ?
    feedId => dispatch(fetchUnsubscribedFeed(feedId)) :
    feedId => dispatch(fetchSingleFeed(feedId));

  return ({
    fetchAction
  });
};

export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(StoriesIndex));
