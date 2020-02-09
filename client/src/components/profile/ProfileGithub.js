import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner'
const ProfileGithub = ({ username, getGithubRepos, repos }) => {

    useEffect(() => { getGithubRepos(username); }, [getGithubRepos]);
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> {' '}Github Repos
                </h2>

            {!repos ? <Spinner /> : (
                repos.map(repo => (
                    <div key={repo._id} className="repo bg-white my-1 p-1">
                        <div>
                            <h4>
                                <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>{repo.name}</a>
                            </h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, fugit?</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)
