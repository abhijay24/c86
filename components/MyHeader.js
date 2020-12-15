import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';


export default class MyHeader extends React.Component{
  constructor(){
    super(props)
    this.state = {
      value:' '
    }
  }
  GetNumberOfUnreadNotifications(){
    db.collection('all_notifications').where('notification_status', '==', 'unread')
    .onSnapshot(snapshot => {
      var unreadNotifications = snapshot.docs.map(doc=>{
        doc.data()
      })
      this.setState({
        value:unreadNotifications.length
      })
    })

  }
  componentDidMount(){
    this.GetNumberOfUnreadNotifications()
  }

  BellIconWithBadge=(props)=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25}
          onPress={() =>props.navigation.navigate('Notification')}/>
         <Badge
          value={this.state.value}
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }
  
  render(){
    return(
      
      <Header
      leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent={<BellIconWithBadge {...props}/>}
      backgroundColor = "#eaf8fe"
    />
      
    )
  }
}
