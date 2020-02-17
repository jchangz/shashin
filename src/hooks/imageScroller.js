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
            animation: null
        };
    }

    handleScroll = (elem) => {

        var scrollPosition = elem.target.scrollLeft
        /*console.log("srcollpose", scrollPosition)*/
        var containerwidth = elem.target.offsetWidth
        /*console.log("container", containerwidth)*/
        var elementleft = elem.target.offsetTop
        /*console.log("elementleft", elementleft)*/

        for (var i = 0; i < this.props.children.length; i++) {
         
            let imagesoffset = elem.target.children[i].offsetLeft
            let imagesoffsetR = elem.target.children[i].offsetWidth
            let scrolling = imagesoffsetR + imagesoffset
            let scrollingrange = scrolling + 50
            /*console.log(this.myInput.current.children[i].text)*/
            let names = this.myInput.current.children[i].text
            let paddingoff = 32;

            if (scrollPosition > (imagesoffset - 164) && scrollPosition < scrollingrange) {
                this.setState({
                    title: names
                });
            }

            /*console.log("imagesoffset", imagesoffset, imagesoffsetR, scrolling,  names)*/
        }
    }

    shouldComponentUpdate = (nextProps, nextState) =>{

        if(this.state.isScrolling !== nextState.isScrolling ) {
            this.toggleScrolling(nextState.isScrolling);
        }
        return true;
    };

    toggleScrolling = (isEnable) => {
        if (isEnable) {
            window.addEventListener('touchmove', this.onTouchMove);
            window.addEventListener('touchend', this.onTouchUp);
            window.addEventListener('mousemove', this.onMouseMove);
            window.addEventListener('mouseup', this.onMouseUp);
        } else {
            window.removeEventListener('mousemove', this.onMouseMove);
            window.removeEventListener('touchmove', this.onTouchMove);
        }
    };

    onMouseUp =  () => {
        this.setState({isScrolling: false, clicking:true, clicked:"no", animation: false, 
                       scrollLeft: 0, scrollTop: 0,
                       clientX: 0, clientY:0});
    };

    onMouseMove = (event) => {
        this.setState({clicking:false})
        const {clientX, scrollLeft, scrollTop, clientY} = this.state;
        this.myInput.current.scrollLeft = scrollLeft + (clientX*3) - (event.clientX*3);
        
        if (event.movementX < 0){
            this.setState({animation: "right"})
        }
        else{
            this.setState({animation: "left"})
        }
    }

    onMouseDown = (event) => {
        var mousepos = null;
        event.preventDefault();
        const {scrollLeft, scrollTop} = this.myInput.current
        this.setState({isScrolling:true, mousePos: mousepos, clicked:"yes", scrollLeft, scrollTop, clientX:event.clientX, clientY:event.clientY});
    };

    onTouchMove = (event) => {
        var touchmove = event.touches[0].clientX;
        var oldtouch = this.state.mousePos
        var touchpos = event.changedTouches[0].clientX
        if (oldtouch < touchpos){
            this.setState({animation: "right"})
        }
        else{
            this.setState({animation: "left"})
        }
    }
   
    onTouchUp =  (event) => {
        setTimeout(() => {
            this.setState({isScrolling: false, clicking:true, clicked:"no", animation: false, 
            scrollLeft: 0, scrollTop: 0,
            clientX: 0, clientY:0});
        }, 300)
    };

    onTouchDown = (event) => {
        var mousepos = event.touches[0].clientX;
        this.setState({isScrolling:true, mousePos: mousepos, clicked:"yes"});
    };

    componentDidMount(){
        this.myInput.current.addEventListener("scroll", throttle(this.handleScroll, 500));
    }

    render() {
        
        return(
            <div className={"Appcon " + this.state.clicking} onTouchStart={this.onTouchDown} onMouseDown={this.onMouseDown}><div className="testcont">
                <h1 className="testin">Japan</h1>
                <h2 className="testinkid">{this.state.title}</h2>
                </div>
                <div className={"App " + this.state.animation + " " + this.state.clicked} ref={this.myInput}>{this.props.children}</div>
            </div>
        )
    }
}

export default ImageScroller;