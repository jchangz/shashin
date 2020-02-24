import React, { useState, useEffect, useRef } from "react";
import throttle from 'lodash/throttle';

class ImageScroller extends React.Component {
  
    constructor(props){
        super(props);
        this.myInput = React.createRef();
        this.state = {
            data: null,
            title: "Hello",
            isScrolling: false,
            clicking: null,
            animation: null,
        };
    }

    getImageProps = () => {
       const imgprops = [];

       for (var i = 0; i < this.props.children.length; i++) {
            let imagesoffsetX    = this.myInput.current.children[i].offsetLeft
            let imagesoffsetY    = this.myInput.current.children[i].offsetTop
            let names            = this.myInput.current.children[i].text

            imgprops.push({
                name:           names,
                coordinateX:    imagesoffsetX,
                coordinateY:    imagesoffsetY
            })
        }

        this.setState({imgdata : {imgprops}}, () => {console.log(this.state.imgdata)})
    };

    handleScroll = (e) => {
        var scrollPositionX     = e.target.scrollLeft
        var scrollPositionY     = e.target.scrollTop

        for (var i = 0; i < this.props.children.length; i++) {
            let imagesoffsetX   = this.state.imgdata.imgprops[i].coordinateX
            let imagesoffsetY   = this.state.imgdata.imgprops[i].coordinateY
            let names           = this.state.imgdata.imgprops[i].name

            if (scrollPositionX > (imagesoffsetX - 164) && scrollPositionY > (imagesoffsetY - 364)) {
                this.setState({
                    title:          names,
                    currentviewX:   imagesoffsetX,
                    currentviewY:   imagesoffsetY -120
                });
            }
        }
    };

    shouldComponentUpdate = (nextProps, nextState) =>{
        if(this.state.isScrolling !== nextState.isScrolling ) {
            this.toggleScrolling(nextState.isScrolling);
        }
        return true;
    };

    toggleScrolling = (isEnable) => {
        if (isEnable) {
            window.addEventListener('mousemove', this.onMouseMove);
            window.addEventListener('mouseup', this.onMouseUp);
        } else {
            window.removeEventListener('mousemove', this.onMouseMove);
        }
    };

    onMouseMove = (e) => {
        this.setState({clicking:false})
        const {clientX, clientY, scrollLeft, scrollTop} = this.state;
        this.myInput.current.scrollLeft = scrollLeft + (clientX*3) - (e.clientX*3);
        this.myInput.current.scrollTop  = scrollTop + (clientY*3) - (e.clientY*3);
        if (e.movementX < 0){
            this.setState({animation: "right"})
        }
        else {
            this.setState({animation: "left"})
        }
    };

    onMouseDown = (e) => {
        var mousepos = null;
        const {scrollLeft, scrollTop} = this.myInput.current
        this.setState({
            isScrolling:    true, 
            mousePos:       mousepos, 
            clicked:        "yes", 
            scrollLeft, 
            scrollTop, 
            clientX:        e.clientX, 
            clientY:        e.clientY
        });
    };

    onMouseUp =  () => {
        this.setState({
            isScrolling:    false, 
            clicking:       true, 
            clicked:        "no", 
            animation:      null, 
            scrollLeft:     0, 
            scrollTop:      0,
            clientX:        0, 
            clientY:        0
        });

        this.myInput.current.scrollTo({
            left:           this.state.currentviewX, 
            top:            this.state.currentviewY, 
            behavior:       'smooth'
        })
    };
   
    componentDidMount(){
        this.myInput.current.addEventListener("scroll",this.handleScroll);
        this.getImageProps()
        window.addEventListener("resize", this.getImageProps)
    }

    componentWillUnmount (){
        this.myInput.current.removeEventListener("scroll",this.handleScroll);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener("resize", this.getImageProps)
    }

    render() {
        return(
            <div className={"Appcon "+ this.state.animation + " " + this.state.clicking} onTouchEnd={this.onMouseUp} onMouseDown={this.onMouseDown}><div className="testcont">
                <h1 className="testin">Japan</h1>
                <h2 className="testinkid">{this.state.title}</h2>
                </div>
                <div className={"App " + this.state.clicked} ref={this.myInput}>{this.props.children}</div>
            </div>
        )
    }
}

export default ImageScroller;