import React from 'react'; 
import { useState} from 'react'; 
import Slider from "react-slick"; 
import './Shows.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const url = "/Users/qianzhang/database-project-frontend/src/images"; 
const images = [{id: 1, type: 'Drama'}, {id: 2, type: 'Musical'}, {id: 3, type: 'Comedy'}, {id: 4, type: 'Horror'}, {id: 5, type: 'Adventure'}]; 

//not changed by database
export function ShowDisplay() { 
    const imgCount = 5;
    const [currentImg, setCurrentImg] = useState(1);      
    const settings = {
        dots: true, //show the dots
        infinite: true, 
        autoplay: true, //3000 ms
        autoplaySpeed: 1500,
        speed: 500, 
        slidesToShow: 3, //show 3 images
        slidesToScroll: 1,
        afterChange: (index) => setCurrentImg((index + 1) % imgCount),
      }; 

    return (
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <div>
                <Slider {...settings}>
                    {
                        images.map(( image, index ) => { 
                            if (index === currentImg) {
                                return (<div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <label>{image.type}</label>
                                    <a onClick={() => scrollToAnchor(`jumpTo${image.id}`) } >
                                    <img src={require(`./images/show/${image.id}.jpg`)} alt={image.type} className = 'middleImage'/>
                                    </a>
                                </div>);
                            } else {
                                return (<div>
                                    <img id = 'normal' src={require(`./images/show/${image.id}.jpg`)} alt={image.type} className = 'sideImage' 
                                    onClick = {() => {document.getElementById('normal').className = 'sideImage'}}/> 
                                </div>);
                            }
                        })
                    }
                </Slider>
            </div>
            <div style = {{marginLeft: 50, marginRight: 50, marginTop: 50}}>
                <ShowBlock />
            </div>
        </div>
    );
}

class ShowBlock extends React.Component {
    state = [
        [{
            id: 1, 
            name: 'Frozen', 
            description: 'Fearless Anna starts her journey to find her sister Elsa', 
            start_time: '14:00:00',
            end_time: '14:30:00', 
            wheelchair_acc: true, 
            price: 20, 
            typeid: 2, 
            type: 'musical'
        }], 
        [{id: 2, 
        name: 'Snow White', 
        description: 'Happy life of princess with seven dwarfs', 
        start_time: '16:30:00',
        end_time: '17:00:00', 
        wheelchair_acc: true, 
        price: 15, 
        typeid: 1, 
        type: 'drama'}], 
        [], [], []]

    render(){
        return (
            <div> 
                <ul>
                {
                    images.map(( image, index ) => (
                        <div>
                            <ShowBar value = {index} stateData = {this.state[index]} />
                            <br />
                        </div>
                    ))
                }
                </ul>
            </div>
        )
    }
}

function ShowBar({value, stateData}) {
    console.log('value: ' + value);
    console.log('stateData: ' + stateData);
    return (
        <div>
            <h3 style = {{marginBottom: 5}}>{images[value].type}</h3>
            <a id = {`jumpTo${images[value].id}`}></a>
            <ul>
                {
                    stateData.map(( show ) => (
                        <li style = {{fontSize: 18}}>
                            <label>{show.name}: {show.description}</label>
                            <br />
                            <label>Show Time: {show.start_time} - {show.end_time}</label>
                            <br />
                            <label>Price: ${show.price}</label>
                            <br />
                            <lable>Wheelchair Accessible: {show.wheelchair_acc ? 'Yes' : 'No'}</lable>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

function scrollToAnchor (anchorName) {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
}