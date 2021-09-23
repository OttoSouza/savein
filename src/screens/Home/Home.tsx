import React, { useCallback, useEffect, useState } from "react";

import {
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Error } from "../../components/Error/index";
import { Divider } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import uuid from "react-native-uuid";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import Information from "../../components/Information";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface IdeaProps {
  id: string;
  title: string;
  date: Date;
}

export const Home: React.FC = () => {
  // Contexto do usuario
  const { user } = useAuth();

  // dados do input
  const [title, setTitle] = useState(null);

  // Obter os erros dentro do estado
  const [error, setError] = useState("");

  // Obter o id da ideia e verificar se é para adicionar ou editar
  const [editIdea, setEditIdea] = useState(null);

  // obter a lista
  const [idea, setIdea] = useState<IdeaProps[]>([]);
  // const [quantity, setQuantity] = useState(0);

  // Habilitar o modal de error
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);

  // Salvar no storage do celular os dados de um determinado usuario
  const key = `@savein:transactions_user:${user.id}`;

  const [information, setInformation] = useState(false);
  const hideInformationDialog = () => setInformation(false);

  // function quantityLetter() {
  //   let digitados = title.length;
  //   let resultado = 30 - digitados;
  //   setQuantity(resultado);
  // }

  async function loadIdea() {
    const data = await AsyncStorage.getItem(key);
    const storageTask = data ? JSON.parse(data) : [];

    const tasksFormatted: IdeaProps[] = storageTask.map((item: IdeaProps) => {
      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date(item.date));

      return {
        id: item.id,
        title: item.title,
        date,
      };
    });

    setIdea(tasksFormatted);
  }

  function findIdea(id: string) {
    const item = idea.find((task) => task.id === id);
    setEditIdea(item);
  }

  async function handleEditTask(id: string, title: string) {
    try {
      const dataKey = key;
      const response = await AsyncStorage.getItem(dataKey);
      const ideas = response ? JSON.parse(response) : [];
      const ideaExists = ideas.some((item) => item.id === id);

      if (!ideaExists) {
        setVisible(true);
        setError("Erro ao atualizar task");
      }

      const updatedIdea = ideas.map((item) =>
        item.id === id
          ? {
              ...item,
              title: title,
            }
          : item
      );
      await AsyncStorage.setItem(dataKey, JSON.stringify(updatedIdea));
      setEditIdea(null);
      loadIdea();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setVisible(true);
        setError(error.message);
      }
    }
  }

  async function handleDelete(id: string) {
    try {
      const dataKey = key;
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];
      const transactionExist = transactions.some(
        (transaction: IdeaProps) => transaction.id === id
      );

      if (!transactionExist) {
        setVisible(true);
        setError("Task nao encontrada");
      }

      const updateTransaction = transactions.filter(
        (transaction: IdeaProps) => transaction.id !== id
      );

      await AsyncStorage.setItem(dataKey, JSON.stringify(updateTransaction));

      loadIdea();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setVisible(true);
        setError(error.message);
      }
    }
  }

  async function handleAddTask() {
    try {
      if (editIdea === null) {
        const schema = Yup.object().shape({
          title: Yup.string().required("Digite o nome da ideia"),
        });

        const newIdea = { id: uuid.v4(), title, date: new Date() } as IdeaProps;

        await schema.validate(newIdea);

        const getIdeas = await AsyncStorage.getItem(key);
        const currentData = getIdeas ? JSON.parse(getIdeas) : [];
        const dataFormatted = [...currentData, newIdea];

        await AsyncStorage.setItem(key, JSON.stringify(dataFormatted));
        loadIdea();
        setTitle("");
      } else {
        handleEditTask(editIdea.id, title);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setVisible(true);
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    if (editIdea !== null) {
      setTitle(editIdea.title);
    } else {
      setTitle("");
    }
  }, [editIdea]);

  useFocusEffect(
    useCallback(() => {
      loadIdea();
    }, [])
  );

  useEffect(() => {
    setInformation(true);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Header title={user.name} photo={user.photo} />
      <View style={{ flex: 3 }}>
        {idea.length > 0 ? (
          <View style={{ padding: 16, flex: 1 }}>
            <View
              style={{
                padding: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[styles.informationHeaderFlatList, { width: "30%" }]}
              >
                Ideia
              </Text>
              <Text style={styles.informationHeaderFlatList}>Data criação</Text>
              <Text style={styles.informationHeaderFlatList}>Opções</Text>
            </View>
            <FlatList
              data={idea}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => (
                <View style={styles.flatContainer}>
                  <View style={styles.flatDivider} />
                  <View style={styles.flatContent}>
                    <Text style={{ paddingLeft: 14, width: "30%", fontFamily: "Nunito_400Regular", fontSize: 16 }}>
                      {item.title}
                    </Text>
                    <Text style={{ paddingLeft: 16, fontFamily: "Nunito_400Regular", fontSize: 16 }}>{item.date}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => findIdea(item.id)}
                        style={{ paddingRight: 16 }}
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={24}
                          color="#ff9000"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(item.id)}
                        style={{ paddingRight: 8 }}
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          size={24}
                          color="#ff0000"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Nenhuma ideia encontrada</Text>
          </View>
        )}
      </View>
      <Footer
        title={title}
        setTitle={setTitle}
        // quantityLetter={quantityLetter}
        // numberLimited={quantity}
        handleAddTask={handleAddTask}
        editIdea={editIdea ? true : false}
      />
      <Error visible={visible} hideDialog={hideDialog} error={error} />
      <Information
        informationVisible={information}
        hideInformationDialog={hideInformationDialog}
      />
    </KeyboardAvoidingView>
  );
};
