import React from 'react';

const LaunchDetail = ({ mission, site, rocket }) => (
  <div>
    <img
      src={mission.missionPatch}
      style={{ width: '200px' }}
      alt={`Mission patch for ${mission.name}`}
    />
    <h2>{mission.name}</h2>
    <h3>Site</h3>
    <p>{site}</p>

    <h3>Rocket</h3>
    <p>
      <strong>Name:</strong> {rocket.name}
    </p>
    <p>
      <strong>Type:</strong> {rocket.type}
    </p>
  </div>
);

export default LaunchDetail;
