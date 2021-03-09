import Pose from "./Pose"
import ReactDragListView from 'react-drag-listview/lib/index.js';

const List = ({ poses, movePosition, editPose, deletePose, setPoses }) => {

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const data = [...poses];
      const item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
      setPoses( data );
    },
    lineClassName: 'global-drag-line',
    nodeSelector: 'li',
    handleSelector: '.pose-drag'
  };
  return (       
    <ReactDragListView {...dragProps}>
    <ul className="list">
      {poses.map((pose, index) => (
        <Pose   
          key={pose.id}
          pose={pose} 
          index={index}
          movePosition={movePosition}
          editPose={editPose}
          deletePose={deletePose}
        />    
      ))}   
    </ul>
    </ReactDragListView>
   );
}
 
export default List;