// Tinder.js
'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, AlertIOS } from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

//Stateless components, only render

let Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style={styles.text}>This is card {this.props.name}</Text>
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})

//Dummy array

const Cards = [
  {name: '1', image: 'https://i.imgur.com/8bQPWNF.jpg'},
  {name: '2', image: 'https://imgur.com/3ZmS6Kd.jpg'},
  {name: '3', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
]

//Array for data and counter

const Cards2 = []

let counter = 3

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards,
      outOfCards: false
    }
  },
  componentDidMount: function() {
  fetch("https://www.reddit.com//r/aww/.json?sort=hot&limit=20", {method: "GET"})
  .then((response) => response.json())
  .then((responseData) => {
    responseData.data.children.forEach(function(picture)
      {
        var url = picture.data.url;
        var url_parsed = url.replace(".gifv",".jpg");

        url_parsed = url.replace(/^http:\/\//i, 'https://');


        counter = counter + 1

        if (url_parsed.search("reddituploads") >= 0) {url_parsed = url_parsed + ".png";}

        if (url_parsed.search("imgur") >= 0) {url_parsed = url_parsed + ".jpg";}


        // console.log(picture.data.url);
        var tempdata = {'name': counter ,'image': url_parsed}
        console.log(tempdata);
        Cards2.push(tempdata);

      })
  
  })
  .done();  
  
  

  },  
  handleYup (card) {
    console.log("yup")
  },
  handleNope (card) {
    console.log("nope")
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

    }

  },
  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    flex: 1,
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})