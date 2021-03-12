import React, { useState } from 'react';
import List from './List';
import EditForm from './EditForm';
import Totals from './assets/Totals';
import { NavLink as Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: '-125vh' },
  show: {
    opacity: 1, y: 0,
    transition: {
      type: 'spring',
      damping: 10, 
      mass: 0.5, 
      stiffness: 120,
      staggerChildren: 0.7,
      duration: 0.4,
    }
  },
  exit: {
    opacity: 0, y: '20vh',
    transition: {
      duration: 0.2
    }
  }
}

const Edit = ({ poses, setPoses, movePosition, deletePose, totalTime }) => {
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const editPose = (index) => {
    setEditIndex(index);
     setEdit(!edit);
  }

  return ( 
    <div className="container">
      {edit 
        ? null 
        : <motion.div 
          className="program-edit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
            <Link to="/program">
              <motion.button 
                type="button" 
                className="on" 
                whileHover={{scale:1.1}}
                whileTap={{scale:0.9}}
              >
                Start
              </motion.button>  
            </Link>    
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
                color: 'rgba(0,0,0,0.75)',
                backgroundColor: 'var(--dark)',
                border: '1px solid var(--dark)'
              }}
            >
              Clear Program
            </motion.button> 
          </motion.div>     
      }
      {edit 
        ? 
          <EditForm 
            index={editIndex}
            poses={poses}
            setPoses={setPoses}
            setEdit={setEdit}
          />
        : 
          <motion.div
            className="wrapper"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{marginTop: '10rem'}}
          >         
              <h1>Current Program</h1>
              <List 
                poses={poses} 
                movePosition={movePosition} 
                editPose={editPose}
                deletePose={deletePose}
                setPoses={setPoses}
              />
          </motion.div>
      }

      <Totals 
        totalTime={totalTime} 
        poses={poses}
      />
    </div>
   );
}
 
export default Edit;