import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, Subheading } from "react-native-paper";
import firebase from 'firebase/app';
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const navigation = useNavigation();

    const signIn = async () => {
        setIsLoading(true);
        try {
            await firebase.auth().signInWithEmailAndPasswrod(email,password);
            navigation.popToTop();
        } catch (e) {
            setIsLoading(false);
            setError(e.message);
        }
    }

    return (
        <View style={{ margin: 16 }}>
            {!!error && (
                <Subheading style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>
                    {error}
                </Subheading>
            )}
            <TextInput
                label="Email"
                style={{ marginTop: 12 }}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                label="Password"
                style={{ marginTop: 12 }}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 16
                }}
            >
                <Button compact onPress={()=> navigation.navigate("SignUp")}>Kaydol</Button>
                <Button
                    mode="contained"
                    onPress={() => signIn()}
                    loading={isLoading}
                >
                    Giriş yap
                </Button>
            </View>
        </View>
    )
}

export default SignIn;


