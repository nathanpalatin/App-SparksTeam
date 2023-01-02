import { useState } from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

type RouteParams = {
  group: string;
}

export function Players(){

  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />

      <Highlight
      title={group}
      subtitle="adicione a galera e separe os time"
      />

      <Form>
      <Input
        placeholder="Nome da pessoa"
        autoCorrect={false}
      />
    <ButtonIcon icon="add" />
    </Form>

    <HeaderList>
    <FlatList
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
      keyExtractor={ item => item}
      renderItem={({ item }) => (
          <PlayerCard 
          name={item}
          onRemove={() => {}}
          />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && {flex: 1}]}
      ListEmptyComponent={() => (
        <ListEmpty message="Esse time está vazio." />
      )}
    />
    
      <Button title="Remover turma" type="SECUNDARY"/>
    </Container>
  )
}