import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({
    username,
    getGithubRepos,
    profile: { repos, loading }
}) => {
    useEffect(() => {
        if (username) {
            getGithubRepos(username);
        }
    }, [getGithubRepos, username]);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">GitHub Repositories</h2>
            {loading ? (
                <Spinner />
            ) : repos && repos.length > 0 ? (
                repos.map((repo) => (
                    <div key={repo.id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                </a>
                            </h4>
                            {repo.description && <p>{repo.description}</p>}
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dark">
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className="badge badge-light">
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <p>No GitHub repositories found.</p>
            )}
        </div>
    );
};

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
    getGithubRepos: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        repos: PropTypes.array,
        loading: PropTypes.bool
    }).isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
