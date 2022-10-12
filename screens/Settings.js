import React, { useEffect,useState } from "react";
import { Text, View } from "react-native";
import { Avatar, Title, Subheading, Button } from "react-native-paper";
import firebase from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";

const Settings = () => {

    const[name,setName]=useState("")
    const [email,setEmail]=useState("")

    useEffect(()=>{
        firebase.auth(),onAuthStateChanged(user=>{
            setName(user?.displayName ??"");
            setEmail(user?.email??"");
            user.displayName
            user.email
        })
    },[])

    return (
        < View style = {{ alignItems: "center", marginTop: 16 }}>
            <Avatar.Text label={name.split(' ').reduce((prev,current)=>prev+current[0],'')} />
            <Title>{name}</Title>
            <Subheading>{email}</Subheading>
            <Button onPress={()=>firebase.auth().signOut()}>
                Çıkış
            </Button>
        </View >
    )
}

export default Settings;


