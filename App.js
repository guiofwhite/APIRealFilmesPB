import {View, Text, Button, TextInput, FlatList} from 'react-native';
import {useState, useEffect} from 'react';

export default function APP(){
  const API = "http://10.0.2.2:3000/filmes";
  
  const [filmes, setFilmes] = useState([]);
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [capa, setCapa] = useState("");

  //Get -> Buscar filmes
  async function carregarFilmes(){
    const resposta = await fetch(API);
    const dados = await resposta.json();
    setFilmes(dados);
  }

  // Post -> Criar um filme
  
  async function adicionaFilme(){
    const novoFilme = {
      id: Date.now(),
      nome,
      ano: Number(ano),
      genero,
      capa
    };
    await fetch(API, {
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(novoFilme)
    });
    setNome("");
    setAno("");
    setGenero("");
    setCapa("");
    carregarFilmes();
  }

  //Delete Filmes

  async function deletarFilme(id){
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });
    carregarFilmes();
  }

  useEffect(()=>{
    carregarFilmes();
  },[]);
  return(
    <View style= {{marginTop: 50, padding:20}}>
      <Text style={{fontWeight:"bold", fontSize:20, textAlign:"center"}}> Lista de Filmes </Text> 

    {/* FORMULÁRIO DE CADASTRO */}
    <TextInput
    placeholder="Nome"
    value={nome}
    onChange={setNome}
    style={{borderWidth:1, marginTop:10, borderRadius:10}}
    />

    <TextInput
    placeholder="Ano"
    value={ano}
    onChange={setAno}
    keyboardType="numeric"
    style={{borderWidth:1, marginTop:10, borderRadius:10}}
    />

    <TextInput
    placeholder="Gênero"
    value={genero}
    onChange={setGenero}
    style={{borderWidth:1, marginTop:10, borderRadius:10}}
    />
    
    <TextInput
    placeholder='(URL da capa)'
    value={capa}
    onChange={setCapa}
    style={{borderWidth:1, marginTop:10, borderRadius:10}}
    />

    <Button 
    title="Adicionar Filme"
    onPress={adicionaFilme}
    />



    {/* LISTA */}
    <FlatList
    data = {filmes}
    keyExtractor={(item)=>item.id.toString()}
    renderItem={({item})=>(
      <View style= {{marginTop:10}}>
        <Text> {item.nome} - {item.ano} </Text>
        <Button 
        title="Excluir" 
        onPress={()=> deletarFilme(item.id)}
        /> 
      </View>
    )}
    />
    </View>
)



}