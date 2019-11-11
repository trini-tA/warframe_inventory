import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Items from'warframe-items'; 
import Immutable from 'immutable';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { items: {}, isLoaded: 0 };
    }

    componentDidMount(){

        //data_category
        let data_category = [];

        if( this.props.data_category !== undefined ){
            data_category.push( this.props.data_category );

            const loadItems = new Items( data_category );
            let filterItems = [];
            
            loadItems.forEach( function(item) {
                if( item.category == data_category ){
                    filterItems.push( item );
    
                }
    
            });
            this.setState( {items: filterItems } );
            this.setState( {isLoaded: 1 } );
        }
        
        

    }

    render() {

        const { items, isLoaded } = this.state;

        console.log( items );
        
        return (
            <div className="container">
                <div className="row">
                    { isLoaded == 1 && 
                        items.map( (item, index) => 
                            <div className="col-md-4" id={index} >
                                <div className="card card-warframe">
                                    <img src={ 'https://cdn.warframestat.us/img/' + item.imageName} className="card-img-top" alt={item.name} />

                                    <div className="card-body">
                                        <h2 className="card-header">{item.name}</h2>
                                        <p className="card-text">{item.description}</p>
                                        <a href="#" class="btn btn-primary">Add on my inventory</a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    const element = document.getElementById('app')
    const data_category = element.getAttribute('data_category');

    ReactDOM.render( <App data_category={data_category}/>, element );
}