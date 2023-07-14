import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native"
import { PermissionsAndroid } from "react-native"
import messaging from '@react-native-firebase/messaging';
import axios from "axios";

export default App = () => {

  const [usuario, setUsuario] = useState('')
  const [token, setToken] = useState('')
  const [ativo, setStatus] = useState(false)

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const testeApi = async () => {
    return await axios({
      url: "https://web.cds-software.com.br/cdsfive.api/api/usuario/autorizausuario",
      method: "POST",
      data: {
        Usuario: "11706547625",
        Senha: "123",
        TipoUsuario: "VENDEDOR"
      }
    })
      .then((response) => {
        setUsuario(response.data.nome)
        setToken(response.data.token)
        setStatus(response.data.ativo)
      })
      .catch((ex) => {
        console.log(ex)
      })
  }

  useEffect(() => {
    requestUserPermission()

  })

  const requestUserPermission = async () => {
    let token = await messaging().getToken()
    console.log("Token", token)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => testeApi()}>
        <Text style={styles.titulo}>Teste API</Text>
      </TouchableOpacity>
      <Text>Usuario: {usuario}</Text>
      <Text>Token: {token}</Text>
      <Text>Ativo: {ativo ? "Ativo" : "Inativo"}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
  }
})
