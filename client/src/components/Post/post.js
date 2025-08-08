import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/postItems';
import CommentForm from './commentForm';
import CommentItem from './commentItem';
const Post = ({ getPost, post: { post, loading } }) => {
    const { id } = useParams();

    useEffect(() => {
        getPost(id);
    }, [getPost, id]);

    if (loading || post === null) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <Link to="/posts" className="btn ">
                Back to Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
