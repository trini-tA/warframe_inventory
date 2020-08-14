import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Items from'warframe-items'; 
import Immutable from 'immutable';
import Loader from 'react-loader-spinner'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            items: {}, 
            isLoaded: 0,
            showLoader: false,
            filter: '',
        };
    }

    componentDidMount(){
        this._loadData( 'clear' );
    }

    action( filter ){
        this.setState({showLoader:true, });
        this.setState({items:{}, });
        this.setState({filter: filter });

        
        this._loadData( 'clear' );
        if( filter != 'clear' ){
            this._loadData( filter );
        }
    }

    _loadData( filter ){
        let data_category = [];
        
        this.setState( {items: {} } );
        this.setState( {isLoaded: 0 } );

        if( this.props.data_category !== undefined ){
            data_category.push( filter );

            const loadItems = new Items( data_category );
            let filterItems = [];
            
            loadItems.forEach( function(item) {
                if( item.category == data_category ){
                    filterItems.push( item );
    
                }
    
            });
            this.setState( {items: filterItems } );
            this.setState( {isLoaded: 1 } );
            this.setState({showLoader:false});
        }
    }

    render() {

        const { items, isLoaded, showLoader, filter } = this.state;

        //console.log( items );
        
        return (
            <div className="container">
                { showLoader && 
                    <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}

                        />
                }
                <div className="row">
                    <div className="col-12">
                        <button id="sentinels" 
                            className="btn btn-default" data-filter="Sentinels" onClick={()=>this.action('Sentinels')}>
                            Sentinels</button>
                        <button id="warframes" 
                            className="btn btn-default" data-filter="Warframes" onClick={()=>this.action('Warframes')}>
                            Warframes</button>
                        <button id="Misc" 
                            className="btn btn-default" data-filter="Misc" onClick={()=>this.action('Misc')}>
                            Misc</button>
                        <button id="Mods" 
                            className="btn btn-default" data-filter="Mods" onClick={()=>this.action('Mods')}>
                            Mods</button>
                        <button id="Pets" 
                            className="btn btn-default" data-filter="Pets" onClick={()=>this.action('Pets')}>
                            Pets</button>
                        <button id="Melee" 
                            className="btn btn-default" data-filter="Melee" onClick={()=>this.action('Melee')}>
                            Melee</button>
                        <button id="Skins" 
                            className="btn btn-default" data-filter="Skins" onClick={()=>this.action('Skins')}>
                            Skins</button>
                        <button id="Skins" 
                            className="btn btn-default" data-filter="Relics" onClick={()=>this.action('Relics')}>
                            Relics</button>
                            
                        <button id="clear" 
                            className="btn btn-default" data-filter="clear" onClick={()=>this.action('clear')}>
                            clear</button>
                    </div>
                </div>
                { !showLoader && 
                    <div id="container-items" className="row">
                        { isLoaded == 1 && 
                            items.map( (item, index) => 
                                <div className="col-md-4" id={index} key={index}>
                                    <div className="card card-warframe">
                                        <img src={ 'https://cdn.warframestat.us/img/' + item.imageName} className="card-img-top" alt={item.name} />

                                        <div className="card-body">
                                            <h2 className="card-header">{item.name}</h2>
                                            <p className="card-text">{item.description}</p>
                                            { item.components != undefined &&
                                                item.components.map( (components, idx) => 
                                                    <>
                                                        { components.uniqueName != '/Lotus/Types/Items/MiscItems/OrokinCell' && 
                                                            <>
                                                                <h3 className="card-text" key={idx}>{components.name}
                                                                { components.ducats != undefined &&
                                                                    <>&nbsp;{components.ducats}</>
                                                                } 
                                                                </h3>
                                                                <>
                                                                    { components.drops != undefined &&
                                                                        components.drops.map( (drops, idx_drops) => 
                                                                            <p className="card-text" key={idx_drops}>{drops.location}</p>
                                                                        )
                                                                    }
                                                                </>
                                                            </>
                                                        }
                                                    </>
                                                )
                                            }
                                            <a href="#" className="btn btn-primary">Add on my inventory</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
                { showLoader && 
                    <div id="container-items" className="row">
                    </div>
                }
            </div>
        );
    }
}

if (document.getElementById('app')) {
    const element = document.getElementById('app')
    const data_category = element.getAttribute('data_category');

    ReactDOM.render( <App data_category={data_category}/>, element );
}