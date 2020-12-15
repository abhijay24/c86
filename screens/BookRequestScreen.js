import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:"",
      requestedBookName: "",
      bookStatus: '',
      requestId:''
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest = async(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
    })
    await this.getBookRequest()
    db.collection('users').where('email_id','==', userId).get()
    .then(snapshot =>{
      snapshot.forEach(doc => {
        db.collection('users').doc(doc.id).update({
          isBookRequestActive:true
        })
      })
    })

    this.setState({
        bookName :'',
        reasonToRequest : ''
    })

    return Alert.alert("Book Requested Successfully")
  }


  getBookRequest = () =>{
    var bookRequest = db.collection('requested_books')
    .where('user_id', '==', this.state.userId).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().book_status !== 'received'){
          this.setState({
            bookStatus:doc.data().book_status,
            requestId : doc.data().request_id,
            docId:doc.id
          })
        }
      })
    })
  }

  getIsBookRequestActive(){
    db.colection('users')
    .where('user_id', '==', this.state.userId)
    .onSnapshot(snapshot =>{
      snapshot.forEach(doc =>{
        this.setState({
          isBookRequestActive: doc.data().isBookRequestActive,
          userDocId:doc.id
        })
      })
    })
    
  }
  updateBookRequestStatus= ()=>{
    db.collection('requested_books').doc(this.state.docId).update({  
      book_status:'received'
    })
    db.collection('users').where('email_id', '==', this.state.userId).get()
    .then(snapshot =>{
      db.collection('users').doc(doc.id).update({
        isBookRequestActive: false
      })
    })
  }
  render(){
    if(this.state.isBookRequestActive === true){
      return(
        <View style = {{flex:1, justifyContent:'center'}}>
          <View style = {{borderColor:'black', borderWidth:2, justifyContent:'center', alignItems:'center'}}>
        <Text>Book Name</Text>
          <Text>{this.state.requestedBookName}</Text>
          </View>
          <View style = {{borderColor:'black', borderWidth: 2, justifyContent:'center', alignItems:'center'}}>
        <Text>book status</Text>
        <Text> {this.state.bookStatus}</Text>
          </View>
        </View>
      )
    }
    else{
    return(
        <View style={{flex:1}}>
          <MyHeader title="Request Book" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter book name"}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
              }
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
