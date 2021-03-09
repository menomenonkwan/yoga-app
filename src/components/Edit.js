import React, { useState } from 'react';
import List from './List';
import EditForm from './EditForm';

const Edit = ({ poses, setPoses, movePosition, deletePose }) => {
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const editPose = (index) => {
    setEditIndex(index);
     setEdit(!edit);
  }

  return ( 
    <div className="container">
      {edit 
        ? 
          <EditForm 
            index={editIndex}
            poses={poses}
            setPoses={setPoses}
            setEdit={setEdit}
          />
        : 
          <React.Fragment>
            <h1>Current Program</h1>
            <List 
              poses={poses} 
              movePosition={movePosition} 
              editPose={editPose}
              deletePose={deletePose}
              setPoses={setPoses}
            />
          </React.Fragment>
      }
    </div>
   );
}
 
export default Edit;