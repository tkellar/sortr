import React from 'react';
import { useParams } from 'react-router-dom';

function Workspace(): JSX.Element {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  return (
    <div className="Workspace">
      This is a workspace with id {workspaceId}
    </div>
  );
}

export default Workspace;
