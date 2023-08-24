import React from 'react';
import { Tree } from 'react-d3-tree';

function FamilyTree({ treeData, onNodeClick }) {
  const containerStyles = {
    width: '500%',
    height: '600px',
  };

  return (
    <div style={containerStyles}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 250, y: 100 }}
        onNodeClick={(nodeData, evt) => {
          onNodeClick(nodeData);
        }}
      />
    </div>
  );
}

export default FamilyTree;
