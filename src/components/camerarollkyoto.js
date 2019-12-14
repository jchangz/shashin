import React from 'react';
import '../App.css';
import {useSpring, animated} from 'react-spring';


function CMRK() {
  const props = useSpring({opacity: 1, from: {opacity: 0}})
    return (
        <animated.div style={props} className="container-maxwidth">


  
  
  <section className="image-single">
    <div className="image-single-img">
      <div className="reflow r-main">
        <img className="lazy" srcSet="https://live.staticflickr.com/65535/48032970951_7e9ceae825_o.jpg 1024w, https://live.staticflickr.com/65535/48033051613_e390bb7756_o.jpg 750w, https://live.staticflickr.com/65535/47984017751_c626e3e61a_o.jpg 320w" sizes="(min-width: 900px) 50vw, 100vw" alt=""></img>
      </div>
    </div>
    
  </section>
  
 <div class="tetxt">
    <h3 class="sub-title-h3">Camera Roll Kyoto</h3>
  </div>

  <section class="image-double">
    
    <div class="image-left">
      <figure>
      <div class="reflow">
        <img class="lazy" data-src="https://live.staticflickr.com/65535/48034089837_6a80aabbc5_o.jpg" alt=""></img>
        <figcaption>Snowfall in Kiyomizu-dera</figcaption>
      </div>
      </figure>
    </div>
    
    <div class="image-right">
      <figure>
      <div class="reflow">
        <img class="lazy" data-src="https://live.staticflickr.com/65535/48034089697_3e1ecbe66a_o.jpg" alt=""></img>
        <figcaption>Snowfall in Kiyomizu-dera</figcaption>
      </div>
        </figure>
    </div>
    
  <div class="caption-grid" id="caption-1">
    <div class="caption">
      <div class="arrow">
      </div>
      <h4 class="text-caption"> Snowfall in Kiyomizu-dera </h4>
    </div>
    
    <div class="caption">
      <div class="arrow pointright">
      </div>
      <h4 class="text-caption"> Kamischiken </h4>
    </div>
    
    <div class="caption">
      <div class="arrow pointdown">
      </div>
      <h4 class="text-caption"> Sakura Season </h4>
    </div>
  </div>
    
    <div class="image-right-caption">
      <figure>
      <div class="reflow">
        <img class="lazy" data-srcset="https://live.staticflickr.com/65535/48034022018_05faae41be_o.jpg 1024w, https://live.staticflickr.com/65535/47989217503_f0fc947713_o.jpg 640w, https://live.staticflickr.com/65535/47984017751_c626e3e61a_o.jpg 320w" sizes="(min-width: 900px) 50vw, 100vw" alt=""></img>
        <figcaption>Kamischiken</figcaption>
      </div>
        </figure>
    </div>

    <div class="image-left nopadding">
      <figure>
       <div class="reflow">
         <img class="lazy" data-src="https://live.staticflickr.com/65535/48034021823_2d3f5e95d2_o.jpg" alt=""></img>
         <figcaption>Sakura season</figcaption>
       </div>
        </figure>
    </div>
    
    <div class="image-right nopadding">
      <figure>
      <div class="reflow">
        <img class="lazy" data-src="https://live.staticflickr.com/65535/48034089507_1ccf5670d4_o.jpg" alt=""></img>
        <figcaption>Sakura season</figcaption>
      </div>
        </figure>
    </div>
  </section>
  

  
  <section class="image-single-centered">
    <article class="image-single-centered-text">
      <h4> Yasaka </h4>
    </article>
    <div class="image-single-centered-img">
      <figure>
      <div class = "reflow">
        <img class="lazy" data-src="https://live.staticflickr.com/65535/48034022103_278e793262_o.jpg" alt=""></img>
        <figcaption>Yasaka Pagoda</figcaption>
      </div>
        </figure>
    </div>
    <article class="image-single-centered-text">
      <h4> Pagoda </h4>
    </article>
  </section>
    
  <section class="image-double-vertical">
    <div class="image-top">
      <figure>
       <div class="reflow">
         <img class="lazy" data-src="https://live.staticflickr.com/65535/48034089942_fb18a2209d_o.jpg" alt=""></img>
         <figcaption>Kamogawa</figcaption>
       </div>
        </figure>
    </div>
    <div class="image-bottom">
      <figure>
      <div class="reflow">
        <img class="lazy" data-src="https://live.staticflickr.com/65535/48033979186_a770ede3d1_o.jpg" alt=""></img>
        <figcaption>Kamogawa</figcaption>
      </div>
        </figure>
    </div>
  </section>
  
  
  <section class="image-double">
    
    <div class="image-left-caption">
      <figure>
      <div class="reflow">
        <img class="lazy" data-srcset="https://live.staticflickr.com/65535/48034021078_9d2860b962_o.jpg 1024w, https://live.staticflickr.com/65535/47989217503_f0fc947713_o.jpg 640w, https://live.staticflickr.com/65535/47984017751_c626e3e61a_o.jpg 320w" sizes="(min-width: 900px) 50vw, 100vw" alt=""></img>
        <figcaption>Shijo-dori</figcaption>
      </div>
        </figure>
    </div>
    
    <article class="image-double-caption-text">
      <h4> Above: Kamogawa </h4>
      <h4> Left: Shijo-dori </h4>
      <h4> Below: Kyoto Tower is omnipresent </h4>
    </article>

    <div class="image-left nopadding">
      <figure>
       <div class="reflow">
         <img class="lazy" data-src="https://live.staticflickr.com/65535/48033978411_1f263e8b98_o.jpg" alt=""></img>
         <figcaption>Kyoto Tower is omnipresent</figcaption>
       </div>
        </figure>
    </div>
    
    <div class="image-right nopadding">
      <figure>
      <div class="reflow">
        <img class="lazy" data-src="https://live.staticflickr.com/65535/48033978271_9988354548_o.jpg" alt=""></img>
        <figcaption>Kyoto Tower is omnipresent</figcaption>
      </div>
        </figure>
    </div>
  </section>
  </animated.div>
      );

}

export default CMRK;
