import { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, ToastAndroid, useColorScheme, useWindowDimensions, View, ScrollView } from 'react-native';
import { AntDesign as Icons } from '@expo/vector-icons';


interface Contato {
  id : number; 
  nome : string;
  telefone : string;
  email : string;
}

export default function App() {
  const colorScheme = useColorScheme();
  const [lista, setLista] = useState<Contato[]>([
    {id: 1, nome: "Joao Silva", telefone: "(11) 1111-1111", email: "joao@teste.com"},
    {id: 2, nome: "Maria Silva", telefone: "(11) 2222-2222", email: "maria@teste.com"},
    {id: 3, nome: "Jose Santos", telefone: "(13) 3333-3333", email: "jose@teste.com"}
  ]);  
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  // const [lista, setLista] = useState<Array<Contato>>([]);
  const [isDark, setDark] = useState<boolean>(
    colorScheme == "dark" ? true : false
  );

  const [filtro, setFiltro] = useState<string>("");

  const estiloAtual = isDark ? estiloDark : estiloLight;
  const placeHolderColor = isDark ? "lightgray" : "darkgray";
  const iconColor = isDark ? "white" : "black";
  const iconName = isDark ? "sun" : "moon";

  // Transformar a lista de objetos em elementos visuais
  // const listaVisual = [];
  // for (let i = 0; i < lista.length; i++) { 
  //   const objContato = lista[i];
  //   listaVisual.push( 
  //     (<View>
  //         <Text>{objContato.nome}</Text>
  //         <Text>{objContato.telefone}</Text>
  //         <Text>{objContato.email}</Text>
  //       </View>)
  //   );
  // }

  // const listaFiltrada : Contato[] = [];
  // for (const objContato of lista) { 
  //   if (objContato.nome.includes( filtro )) { 
  //     listaFiltrada.push( objContato );
  //   }
  // }

  // const listaVisual = [];
  // for (const objContato of listaFiltrada ) { 
  //   listaVisual.push( 
  //     (<View>
  //         <Text>{objContato.nome}</Text>
  //         <Text>{objContato.telefone}</Text>
  //         <Text>{objContato.email}</Text>
  //       </View>)
  //   );
  // }

  //const listaVisual : ReactElement[] = [];
  //essa função de filtro é chamada a cada renderização, ou seja, a cada mudança de estado
  //e ela é responsável por criar a lista de elementos visuais a partir da lista de contatos, filtrando os contatos que possuem o nome que inclui o filtro
  
  //a gente fez pegar a lista de contatos e filtrar ela, ou seja, criar uma nova lista apenas com os contatos que possuem o nome que inclui o filtro, e depois a gente transformou essa lista filtrada em elementos visuais
  //vai receber cada objetos e vai retonar true ou false, se retornar true ele vai incluir o objeto na nova lista, se retornar false ele vai excluir o objeto da nova lista
  /*const listaFiltrada = lista.filter(  (objContato : Contato, idx : number) => {
    return objContato.nome.includes( filtro )
  } )

  const listaVisual= listaFiltrada.map( (objContato : Contato, idx : number) => {
    return (
      <View>
        <Text>{objContato.nome}</Text>
        <Text>{objContato.telefone}</Text>
        <Text>{objContato.email}</Text>
      </View>
    )
  })*/
   const listaVisual = lista
  .filter(  (objContato : Contato, idx : number) => {
    return objContato.nome.includes( filtro )
  } )
  .map( (objContato : Contato, idx : number) => { return (
      <View key={`contato-${objContato.id}`}>
          <Text>{objContato.nome}</Text>
          <Text>{objContato.telefone}</Text>
          <Text>{objContato.email}</Text>
      </View>)
  } )  
  //java e kotli fazem isso com o stream, ou seja, a gente pega a lista de contatos e transforma ela em um stream, e depois a gente aplica o filtro e o map nesse stream, e depois a gente transforma esse stream em uma lista de elementos visuais
  //mas o typeScript não tem stream, então a gente tem que fazer isso com as funções de array mesmo, ou seja, a gente pega a lista de contatos e aplica o filtro e o map diretamente nela, sem precisar transformar ela em um stream antes
  
  //o flacklist, nao vai mostra uma lista enorme para a gente ver mas sim algo pequeno e bom visualmente

  return (
    <View style={estiloAtual.main}>
      <View style={estiloAtual.topBar}>
        <Icons name={iconName} size={32} color={iconColor} onPress={()=>{
          setDark(  !isDark  );
        }}/>
      </View>
      <View style={estiloAtual.container}>
        <TextInput value={nome} placeholder="Nome Completo: "
          onChangeText={setNome}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
        <TextInput value={telefone} placeholder="Telefone: "
          onChangeText={setTelefone}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
        <TextInput value={email} placeholder="Email: "
          onChangeText={setEmail}
          style={estiloAtual.input}
          placeholderTextColor = {placeHolderColor}/>
        <Button title="Salvar" onPress={()=>{
          const obj : Contato = { id : 0,
            nome, telefone, email };

          // setLista( [...lista, obj] );
          setLista( [...lista,  obj ] );
          
          ToastAndroid.show("Contato Salvo", ToastAndroid.LONG);
          setNome("");
          setTelefone("");
          setEmail("");
        }} />
        <Button title="Pesquisar" onPress={()=>{
          console.log("Pesquisar acionado", lista);
          for(const contato of lista) { 
            console.log("Contato: ", contato);
            if( contato.nome.includes( nome )) { 
              setNome( contato.nome );
              setTelefone( contato.telefone );
              setEmail( contato.email );
            }
          }
        }}/>
        <StatusBar style="auto" />
      </View>
      <View style={[estiloAtual.container, {flex: 8}]}>
          <TextInput value={filtro} placeholder="Filtro: "
            onChangeText={setFiltro}
            style={estiloAtual.input}
            placeholderTextColor = {placeHolderColor}/>
          <Text> Lista </Text>
          <ScrollView>
            {listaVisual}
          </ScrollView>
      </View>
    </View>
  );
}

const estiloLight = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    marginHorizontal: 5
  },
  topBar: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    color : "black"
  },
  input : {
    backgroundColor: "lightblue",
    borderColor: "pink",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    color : "black"
  }
});

const estiloDark = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 30,
    marginHorizontal: 5
  },
  topBar: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 11,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'center',
    color : "white"
  },
  input : {
    backgroundColor: "darkblue",
    borderColor: "pink",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    color : "white"
  }
});
