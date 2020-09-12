import React from 'react';
import ContributorsView from './ContributorsView';
import Favorite from './FavoriteView';
import ReactTooltip from "react-tooltip";
import ReactPaginate from 'react-paginate';
import Loader from './Loader';
import { connect } from 'react-redux';
import * as actions from '../store/reducers.store';

interface Props {
  storeListOfFavorites: ([]) => void;
}

class MasterView extends React.Component<Props, any> {
  constructor(props: any) {
    super(props);
    // Initial state
    this.state = {
      originalMasterData: [],
      masterData: [],
      contributorsData: [],
      showContributorModal: false,
      showFavoriteModal: false,
      currentPageNumber: 0,
      pageCount: 10,
      loader: false,
      favoriteList: []
    }
  }

// Getting repositories list from Github API
  componentDidMount() {
    this.setState({ loader: true });
    fetch("https://api.github.com/repositories")
      .then(res => res.json())
      .then((data) => {
        // data.map((item:any)=>item.isFavorite=false);
        this.setState({ originalMasterData: data });
        this.setState({ masterData: data.slice(0, 10) });
        this.setState({ loader: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

// Adding selected repositories to the favorite list and viceversa
  favoriteHandler = (id: number) => {
    this.setState({ showFavoriteModal: false });
    let originalMasterData = [...this.state.originalMasterData];
    var findIndex = originalMasterData.findIndex((x: any) => x.id === id);
    if (originalMasterData[findIndex].isFavorite) {
      originalMasterData[findIndex].isFavorite = false;
      var index = this.state.favoriteList.indexOf(id);
      this.state.favoriteList.splice(index, 1);
    } else {
      originalMasterData[findIndex].isFavorite = true;
      this.setState((prevState: any) => ({
        favoriteList: [...prevState.favoriteList, id]
      }));
    }
    this.setState({ originalMasterData: originalMasterData, masterData: originalMasterData.slice() });
  }

// Getting specific repository contributors list from API 
  contributorHandler = (url: string) => {
    this.setState({ loader: true });
    this.setState({ showContributorModal: false });
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({ contributorsData: data, showContributorModal: true });
        this.setState({ loader: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

// searching repositories  
  searchHandler = (e: any) => {
    let searchValue = e.target.value.toLowerCase();
    let filteredList = this.state.originalMasterData.filter((item: any) => {
      return (item.name.toLowerCase().match(searchValue))
        || (item.full_name.toLowerCase().match(searchValue))
    });
    this.setState({ pageCount: Math.ceil(filteredList.length / 10) })
    this.setState({ masterData: filteredList.slice(0, 10), currentPageNumber: 0 });

  }

// Pagination for list of repositories  
  handlePageClick = (data: any) => {
    this.setState({
      masterData: this.state.originalMasterData.slice(data.selected * 10, data.selected * 10 + 10),
      currentPageNumber: data.selected
    });
  }

// Modal open for Favorites list
  openFavoriteModal = () => {
    this.setState({ showFavoriteModal: true });
    this.props.storeListOfFavorites(this.state.favoriteList)
  }

  render() {
    return (
      <div className="table-view">
        <div className="row header-section mb-3">
          <div className="col-lg-6">
            <div className="title">
              <h1>Master View</h1>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="search-box">
              <nav className="navbar navbar-expand-sm">
                <input className="form-control" type="text" placeholder="Search" onChange={(e) => this.searchHandler(e)} />
                <span className="join-btn"><i className="fas fa-search"></i></span>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="favorities">
              <button className="btn btn-info" onClick={this.openFavoriteModal}>Favorities List</button>
            </div>
          </div>
        </div>

        <div className="table-data">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S.No </th>
                <th></th>
                <th>Name </th>
                <th>Full Name </th>
                <th>Repository Link </th>
                <th>Contributors URL </th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.masterData.map((item: any, index: number) =>
                  <tr key={item.id}>
                    <td>{(this.state.currentPageNumber * 10) + index + 1}</td>
                    <td><span data-tip data-for="registerTip" onClick={() => this.favoriteHandler(item.id)}>
                      <i className={item.isFavorite ? "fas fa-heart color-red" : "fas fa-heart"}></i>
                    </span>
                      <ReactTooltip id="registerTip" place="bottom" effect="solid">
                        Favorities
                      </ReactTooltip>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.full_name}</td>
                    <td><a href={item.html_url} rel="noopener noreferrer" target="_blank">Click here to view Repository</a></td>
                    <td><button className="btn btn-sm btn-outline-info" onClick={() => this.contributorHandler(item.contributors_url)}>Click here to view Contributors</button></td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <div className="row">
            <div className="col-lg-4 records-count">
              {this.state.masterData.length > 0 && <p>Displaying  {(this.state.currentPageNumber * 10) + 1} - {(this.state.currentPageNumber * 10) + this.state.masterData.length} records.</p>}
              {this.state.masterData.length === 0 && <p>No records found</p>}
            </div>
            <div className="col-lg-8 pagination">
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </div>
        {this.state.showContributorModal && <ContributorsView  {...this.state} />}
        {this.state.showFavoriteModal && <Favorite
          // closeFavoriteModal={this.closeFavoriteModal}
          {...this.state} />}
        {this.state.loader && <Loader />}
      </div>
    )
  }
}

// storing favorite list to redux
let mapDispatchToProps = (dispatch: any) => {
  return {
    storeListOfFavorites: (favoriteList: any) => dispatch(actions.storeListOfFavorites(favoriteList))
  }
}

export default connect(null, mapDispatchToProps)(MasterView);
