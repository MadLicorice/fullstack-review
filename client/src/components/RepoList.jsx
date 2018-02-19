import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
    {props.repos.map((repo, index) => {
      return <div key={index} className="repo">{'Repo name: '}{repo.name}<br></br>{' Repo link: '}{repo.link}</div>
    })}
    </div>
  </div>
)

export default RepoList;