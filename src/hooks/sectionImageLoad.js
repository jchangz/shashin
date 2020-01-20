import React, {useState} from 'react';

function imgLoad(url) {
    return new Promise(function(resolve, reject) {
      var img = new Image();
      img.src = url;
      img.onload = function() {
        resolve(img);
      }
      img.onerror = reject
    });
  }

 class SectionLoader extends React.Component {
     
    constructor(props){
        super(props);
        this.state = {
            data: null,
            itemlist: [this.props.children.props.src],
            fff: []
        };
    }

    componentDidMount(){
        this.handleImageLoaded();
        console.log("1", this.state)
        }
    
    handleImageLoaded() {

        let imageLoadpromises = this.state.itemlist.map(imgLoad)

        Promise.all(imageLoadpromises ).then(() => {
            this.setState({
                data: true
        });
            });
      
    }
    
    render() {

        let { className } = this.props;
        let { classNamed } = this.props;
        let { classNamedd } = this.props;

        className = this.state.data ? "loaded" : "hello";
        classNamed = this.state.data ? "hello" : "loaded";
        classNamedd = this.state.data ? "hello2" : "loaded";
        
        return(
            <div>
                <div className={classNamedd}><div className="header"></div></div>
                <div className= {classNamed}><div className="leader"></div></div>
                <div className= {className}>{this.props.children}</div>
            </div>
        )
    }
}

export default SectionLoader;

