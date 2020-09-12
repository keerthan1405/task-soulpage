import React from 'react'
import Modal from 'react-modal';
Modal.setAppElement('#root');

const ContributorsView = (props:any) => {
  const [modalIsOpen,setmodalIsOpen] = React.useState(true);

  function closeModal(){
    setmodalIsOpen(false);
  }

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '700px',
      maxHeight             : '500px'
    }
  };

  return (
    <div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h4>Contributors List</h4>
          <button className="close-popup" onClick={closeModal}><i className="fas fa-times"></i></button>
          <div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Type</th>
                <th>No. of Contributors</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {
                props.contributorsData.map((item:any, index:number) =>
                <tr key={item.id}>
                  <td>{index +1}</td>
                  <td>{item.login}</td>
                  <td>{item.contributions}</td>
                  <td>{item.type}</td>
                </tr>
                )
              } 
            </tbody>
          </table>
          {
            props.contributorsData.length ===0 && <div className="text-center"><p>No records found</p></div>
          }
          </div>
        </Modal>
    </div>
  )
}
export default ContributorsView
