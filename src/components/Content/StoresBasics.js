import React from 'react'; 
import Slider from "react-slick"; 

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Stores.css'; 

const categories = 
    [{id: 1, type: 'Food Stall'}, {id: 2, type: 'Ice Cream Parlor'}, {id: 3, type: 'Restaurant'}, {id: 4, type: 'Gift Shop'}, {id: 5, type: 'Apparels'}]; 

export class StoreDisplay extends React.Component {
    storeState = [
        [{
            id: 1, 
            name: 'Food Train', 
            description: 'Serve delicious and convenient meals', 
            ctgid: 1, 
            category: 'Food stall'
        }, {
            id: 2, 
            name: 'Fancy Food', 
            description: 'Serve cute burgers and sides children love', 
            ctgid: 1, 
            category: 'Food stall'
        }], 
        [{
            id: 3, 
            name: 'Magic Ice Cream', 
            description: 'Serve ice creams with magic chocolate chips', 
            ctgid: 2, 
            category: 'Ice cream parlor'
        }], 
        [], [], []]
    
        //each item is a store, including all the menu items
        menuState = [
            {id: 1, name: 'original coke', unit_price: 2, storeid: 1, storename: 'Food Train'}, 
            {id: 2, name: 'diet coke', unit_price: 2, storeid: 1, storename: 'Food Train'}, 
            {id: 3, name: 'hot dog', unit_price: 10, storeid: 1, storename: 'Food Train'}, 
            {id: 1, name: 'original coke', unit_price: 2, storeid: 2, storename: 'Fancy Food'}, 
            {id: 2, name: 'diet coke', unit_price: 2, storeid: 2, storename: 'Fancy Food'}, 
            {id: 4, name: 'french fries', unit_price: 5, storeid: 2, storename: 'Fancy Food'}, 
            {id: 5, name: 'beef burger', unit_price: 12, storeid: 2, storename: 'Fancy Food'}, 
            {id: 6, name: 'vanilla ice cream', unit_price: 4, storeid: 3, storename: 'Magic Ice Cream'}, 
            {id: 7, name: 'matcha ice cream', unit_price: 5, storeid: 3, storename: 'Magic Ice Cream'}, 
            {id: 8, name: 'coffee ice cream', unit_price: 5, storeid: 3, storename: 'Magic Ice Cream'}]

    render() {
        return (
            <div style = {{display: 'flex', flexDirection: 'column'}}>
                <ul>
                {
                    categories.map((category, index) => (
                        <div>
                            <h3 style={{marginTop: 20}}>{category.type}</h3>
                            <StoreBar value = {category.id} storeData={this.storeState[index]} menuData={this.menuState}/>
                        </div>
                    ))
                }
                </ul>
            </div>
        );
    }

} 

function StoreBar({value, storeData, menuData}) {    
    const settings = {
        dots: true, //show the dots
        infinite: true, 
        autoplay: true, //3000 ms
        autoplaySpeed: 1500,
        speed: 500, 
        slidesToShow: 3, //show 3 images
        slidesToScroll: 1
    }; 
    console.log('store count: ' + storeData.length);
    return (
    <div> 
        {
            storeData.map((store, index) => {
                return (
                <div>
                    <h4 style={{marginTop: 10}}>{store.name}</h4>
                    <Slider {...settings}>
                        {
                            menuData.map((item, index) => {
                                if (item.storename === store.name) {
                                    return(
                                    <div>
                                        <img src={require(`./images/menuitem/${item.name}.jpg`)} alt={item.name} className = 'itemImage'/>
                                        <label>{item.name} ${item.unit_price}</label>
                                    </div>)
                                } else {
                                    return null;
                                }
                            })
                        }
                    </Slider>
                </div>)
            })
        }
    </div>);
}
