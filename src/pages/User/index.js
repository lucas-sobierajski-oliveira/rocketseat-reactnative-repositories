import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ navigation, route }) {
  const { user } = route.params;

  navigation.setOptions({ title: user.name });

  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  async function load(currentPage = 0) {
    const response = await api.get(`/users/${user.login}/starred`, {
      params: { page: currentPage + 1 },
    });
    setPage(currentPage + 1);
    setStars(currentPage > 1 ? [...stars, ...response.data] : response.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function refresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  function handleAcessRepository(repository) {
    console.log('apertou');
    navigation.navigate('Repository', { repository });
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {loading ? (
        <ActivityIndicator color="#999" />
      ) : (
        <Stars
          onRefresh={refresh}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={() => load(page)}
          data={stars}
          keyExtractor={(star) => String(star.id)}
          renderItem={({ item }) => (
            <Starred onPress={() => handleAcessRepository(item)}>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
    </Container>
  );
}

User.proTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
