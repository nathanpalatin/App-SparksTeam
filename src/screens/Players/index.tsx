import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from '@components/PlayerCard';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players(){
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

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
     const playersByTeam = await playerGetByGroupAndTeam(group, team);
     setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
    }
    
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
    <FlatList
      data={players}
      keyExtractor={ item => item.name}
      renderItem={({ item }) => (
          <PlayerCard 
          name={item.name}
          onRemove={() => {}}
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
    
      <Button
        title="Remover turma"
        type="SECUNDARY"
      />
    </Container>
  )
}