import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from '@components/PlayerCard';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players(){
  const [isLoading, setIsLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef =  useRef<TextInput>(null);

  async function handleAddPlayer(){
    if(newPlayerName.trim().length === 0){
       return Alert.alert('Novo jogador', 'Informe o nome da pessoa.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();

    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo Jogador', error.message);
      }
    }
  }

  async function fetchPlayersByTeam(){
    try {
    setIsLoading(true);

    const playersByTeam = await playerGetByGroupAndTeam(group, team);
    setPlayers(playersByTeam);
    
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
    } finally {
      setIsLoading(false);
    } 
  }

  async function handlePlayerRemove(playerName: string){
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possível remover essa pessoa.');
    }
  }

  async function groupRemove(){
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover', 'Não foi possível remover o grupo.');
    }
  }

  async function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover a turma?', [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()}
      ]
    );
  }

  useEffect(() => {
   fetchPlayersByTeam();
  }, [team]);
  
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
         <ButtonIcon
            icon="add"
            onPress={handleAddPlayer}
        />
      </Form>

    <HeaderList>
    <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={['Time A', 'Time B']}
        keyExtractor={item => item}
        renderItem={({ item }) => (
      <Filter
        title={item}
        isActive={item === team}
        onPress={() => setTeam(item)}
      />  
    )}
    />
      <NumbersOfPlayers>
       {players.length}
      </NumbersOfPlayers>
    </HeaderList>

        {
          isLoading ? <Loading /> :
          
    <FlatList
      data={players}
      keyExtractor={ item => item.name}
      renderItem={({ item }) => (
          <PlayerCard 
          name={item.name}
          onRemove={() => handlePlayerRemove(item.name)}
          />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && {flex: 1}]}
      ListEmptyComponent={() => (
        <ListEmpty
          message="Esse time está vazio, vamos adicionar os jogadores?"
        />
      )}
    />
  } 
    
      <Button
        title="Remover turma"
        type="SECUNDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}