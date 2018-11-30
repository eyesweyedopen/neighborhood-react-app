import React, { Component } from 'react'

class Menu extends Component {
    state = {
    }

    componentDidMount() {
        console.log(this.props);
    }

    addPicture(res) {
        console.log(res.photos[0].getUrl());
        return (
            <img src={res.photos[0].getUrl()} alt={res.name}/>
        )
    }

    updateSearchArea(e) {
        const radius = e.target.value;

    }

    render() {
        return (
            <div className={`menu-tray ${this.props.wasClicked ? 'open' : ''}`}>
                <form>
                    <input>

                    </input>
                    <div>
                        <h3>Search within: </h3>
                        <select onChange={this.updateSearchArea}>
                            <option value="5000">5 km</option>
                            <option value="10000">10 km</option>
                            <option value="25000">25 km</option>
                            <option value="50000">50 km</option>
                        </select>
                    </div>
                </form>
                
                <ol className="place-list">
                    <h2>Results</h2>
                    {this.props.listOfPlaces.map((place) => {
                        return (
                            <li key={place.id} onClick={(e) => this.props.handleClick(place, e)} className="result-item">
                                <h3 className="result-name">{place.name}</h3>
                                <p className="result-address">{place.formatted_address}</p>
                                <hr />
                            </li>
                        )
                    }, this)}
                </ol>
            </div>
        )
    }
}

export default Menu