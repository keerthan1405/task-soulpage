import React,{useEffect, useState} from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux';
Modal.setAppElement('#root');

const FavoriteView = (props: any) => {
  const [modalIsOpen, setmodalIsOpen] = useState(true);
  const [favoriteData, setFavoriteData] = useState<string[]>([]);

// getting data of favorites list  
  useEffect(() => {
    console.log(props.listOfFavorites, 'props1234')
    let selectedID = props.listOfFavorites;
    let filteredData = new Array();
    props.masterData.map((item:any) =>{
      if(selectedID.includes(item.id)){
        filteredData.push(item)
      }
    });
    setFavoriteData(() => [...filteredData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function closeModal() {
    setmodalIsOpen(false);
    // props.closeFavoriteModal();
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '900px',
      maxHeight: '400px'
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
        <h4>Favorities List</h4>
        <button className="close-popup" onClick={closeModal}><i className="fas fa-times"></i></button>
        <div>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S.No </th>
                <th>Name </th>
                <th>Full Name </th>
                <th>Repository Link </th>
              </tr>
            </thead>
            <tbody>
              {
                favoriteData.map((item: any, index: number) => 
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.full_name}</td>
                    <td><a href={item.html_url} rel="noopener noreferrer" target="_blank">Click here to view Repository</a></td>
                  </tr>
                )
              }
            </tbody>
          </table>
          {favoriteData.length === 0 && <p>No records found</p>}
            {favoriteData.length > 0 && <p>Displaying {favoriteData.length} records.</p>}
        </div>
      </Modal>
    </div>
  )
}

// getting favorite list from redux
let mapStateToProps = (state: any) => {
  return {
      listOfFavorites: state.sampleReducers.listOfFavorites
  }
}

export default connect(mapStateToProps, null)(FavoriteView);
