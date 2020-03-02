import React, { useState, useEffect, useRef } from "react";
import throttle from 'lodash/throttle';
import {Spring} from 'react-spring/renderprops'
import {Transition} from 'react-spring/renderprops'
import smoothscroll from 'smoothscroll-polyfill';

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
            mobileclick: 'nope'
        };
    }

    TouchMe = () => {
        var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

        if (supportsTouch === true){
            this.setState({touching : "yes"}, () => {console.log(this.state.touching)})
        }
        else {
            this.setState({touching : "no"}, () => {console.log(this.state.touching)})
        }
    }

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

    shouldComponentUpdate = (nextProps, nextState) =>{
        if(this.state.isScrolling !== nextState.isScrolling ) {
            this.toggleScrolling(nextState.isScrolling);
        }
        return true;
    };
   
    componentDidMount(){
  
        document.documentElement.style.setProperty('--base', (window.innerHeight - 64 + 'px'));
       console.log(document)
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const { isIntersecting, intersectionRatio } = entry
                if (isIntersecting === true ) {
                    this.setState({
                        title: entry.target.textContent, 
                        currentviewX: entry.target.offsetLeft - 32, 
                        currentviewY: entry.target.offsetTop - 86
                    })
                }
            })
        }, 
            {root:this.myInput.current, threshold: 0.75}
        );

        for (var i = 0; i < this.props.children.length; i++) {
            this.observer.observe(this.myInput.current.children[i]);
        }
        
        smoothscroll.polyfill();

        this.TouchMe()
    }

    componentWillUnmount (){
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    }
    
    onclick = () => {
        if (this.state.mobileclick === "mob"){
            this.setState({mobileclick: "nope"})
            this.myInput.current.scrollTo({
                left:           this.state.currentviewX, 
                top:            this.state.currentviewY, 
                behavior:       'smooth'
            })
        }
        else{
            this.setState({mobileclick: "mob"})

        }
    }

    render() {
        if (this.state.touching === "no") {
            return(
                <div className={"Appcon "+ this.state.animation + " " + this.state.clicking} onTouchEnd={this.onMouseUp} onMouseDown={this.onMouseDown}><div className="testcont">
                    <h1 className="testin">Japan</h1>
                    <Transition items={this.state.title}
              from={{ position: 'absolute', opacity: 0, transform: 'translate3d(0, 100%,0)' }}
              enter={{ opacity: 1, transform: 'translate3d(0%,0,0)' }}
              leave={{ opacity: 0, transform: 'translate3d(0,100%,0)' }}>
            {item => props =>
                <h2 style={props} className="testinkid">{item}</h2>}</Transition>
                    </div>
                    <div className={"App " + this.state.clicked} ref={this.myInput}>{this.props.children}</div>
                </div>
            )
        }
        return(
            <div className={"Appcon "+ this.state.animation + " " + this.state.clicking + " " + this.state.mobileclick} onClick={this.onclick}><div className="testcont">
<Transition items={this.state.title}
              from={{ position: 'absolute', height: 0, background: 'white', overflow: 'hidden'}}
              enter={{ height: 'auto', opacity: 1}}
              leave={{ height: 0, opacity: 0 }}>
            {item => props =>
                <h2 style={props} className="testinkid">{item}</h2>}</Transition>
                </div>
                <div className={"App mobile " + this.state.mobileclick} onClick={this.mobileonclick} ref={this.myInput}>{this.props.children}</div>
            </div>
        )
    }
}

export default ImageScroller;