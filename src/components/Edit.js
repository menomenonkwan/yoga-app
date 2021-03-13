import React, { useState } from 'react';
import List from './List';
import EditForm from './EditForm';
import Totals from './assets/Totals';
import { motion } from 'framer-motion';

const Edit = ({ poses, setPoses, movePosition, deletePose, totalTime }) => {
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const editPose = (index) => {
    setEditIndex(index);
     setEdit(!edit);
  }

  return ( 
    <div className="section-list">
      <h2>Current Program</h2>
      <motion.button 
        type="button" 
        className="on" 
        onClick={() => setPoses([])}
        whileHover={{
          scale:1.1,
          color: 'var(--bright)'
        }}
        whileTap={{scale:0.9}}
        style={{ 
          color: 'rgba(0,0,0,0.5)',
          backgroundColor: 'var(--purple)',
          border: '1px solid var(--dark)'
        }}
      >
        Clear Program
      </motion.button> 
      <Totals 
        totalTime={totalTime} 
        poses={poses}
      />
      {edit 
        ? <EditForm 
            index={editIndex}
            poses={poses}
            setPoses={setPoses}
            setEdit={setEdit}
          />
        : <List 
            poses={poses} 
            movePosition={movePosition} 
            editPose={editPose}
            deletePose={deletePose}
            setPoses={setPoses}
          />
      }
    </div>
  );
}
 
export default Edit;