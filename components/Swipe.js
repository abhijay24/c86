import * as React from 'react';
import { TouchableOpacity , View, Text, Dimensions, FlatList, ListItem, SwipeableListView} from 'react-native';
import { ScaleFromCenterAndroid } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets';

export default class Swipe extends React.Component{
constructor(props){
super(props)
this.state = {
allNotifications: this.props.allNotifications

}
}
updateMarkAsRead =() =>{
    db.collection('all_notifications').doc(notification.doc_id).update({
        'notification_status': 'read'
    })
}

onSwipe= (swipeData)=>{
    var allNotifications = this.state.allNotifications
    const {key, value} = swipeData
    if(value < Dimensions.get('window').width){
        const newData = [...allNotifications]
        const previousIndex = allNotifications.findIndex(item => item.key === key)
        this.updateMarkAsRead(allNotifications[previousIndex])
        newData.splice(previousIndex, 1)
        this.setState({allNotifications: newData})
    }
}

renderItem = (data) => {
    <ListItem 
    leftElement = {<Icon name = 'book' type = 'font-awesome'/>}
    title = {data.item.book_name}
    subtitle = {data.item.message}
    bottomDivider 
    />
}

renderHidden = () => {
    <View style = {styles.backRow}>
        <View style = {[styles.backRightButton, styles.backRightButtonRight]}>
            <Text style = {styles.backText}>
                
            </Text>
        </View>
    </View>
}

    render(){
    return(        <View style = {styles.container}>
            <SwipeListView
            disableRightSwipe
            data = {this.state.allNotifications}
            renderItem = {this.renderItem}
            renderHidden = {this.renderHidden}
            rightOpenValue = {-Dimensions.get('window').width}
            previewOpenValue = {-40}
            previewOpenDelay = {3000}
            onSwipeValueChange = {this.onSwipe}
/>
            
        </View>
    )
}

}

const styles = StyleSheet.create({
    container : {
      flex : 1
    },
    backRow : {
        alignItems: ScaleFromCenterAndroid,
        backgroundColor:'white',
        flex: 1,
        flexDirection:'row',
        justifyContent: space-between,
        paddingLeft: 50
    },
    backRightBtn: 
    { alignItems: 'center',
     bottom: 0, justifyContent: 'center', 
     position: 'absolute', top: 0, width: 100,
     },
      backRightBtnRight:   {
     backgroundColor: '#29b6f6', 
     right: 0,
        },
  })