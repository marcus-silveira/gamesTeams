import { useState, useCallback } from "react";
import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups] = useState([]);
  const navigation = useNavigation();

  async function loadGroups() {
    const loadedGroups = await groupsGetAll();
    setGroups(loadedGroups);
  }

  function handleNewGroup() {
    navigation.navigate("new");
  }

  function handleOpenGroup(group: string) {
    navigation.navigate("patients", { group });
  }

  useFocusEffect(
    useCallback(() => {
      console.log("load groups");
      loadGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight
        title="Clínicas"
        subtitle="Abaixo estão listadas todas as clínicas cadastradas"
      />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Nenhuma clínica cadastrada" />
        )}
      />

      <Button title="Adicionar clínica" onPress={handleNewGroup} />
    </Container>
  );
}
