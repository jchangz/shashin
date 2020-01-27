import React, {useState} from 'react';
import throttle from 'lodash/throttle';

const _loaded = {};

class HeroLoader extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            data: null,
        };
    }

    state = { width: 0, height: 0, loaded: _loaded[this.props.src] };

    static defaultProps = {
        className: "",
        loadingClassName: "img-loading bg",
        loadedClassName: "img-loaded bg"
      };

    onLoad = () => {
        _loaded[this.props.src] = true;
        this.setState(() => ({ loaded: true }));
    };
  
    render() {

        let { className, loadedClassName, loadingClassName, ...props } = this.props;

        className = `${className} ${this.state.loaded ? loadedClassName: loadingClassName}`;

        if (this.state.width > 769) {
            return(
                <div class="overflow">
                    <img className={className} onLoad={this.onLoad} src={this.props.src}
                    /*style={{backgroundImage:`url(${this.props.src})`}}*//>
                </div>
            )}

        return(null)
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    componentDidMount() {
        window.addEventListener('resize', throttle(this.updateDimensions, 250, {leading:true}));
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }
}

export default HeroLoader;


