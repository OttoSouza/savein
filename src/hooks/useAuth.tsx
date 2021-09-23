import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProvider {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}
interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  userLoading: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User>({} as User);
  const userStorageKey = "@savein:user";
  const [userLoading, setUserLoading] = useState(true);

  /**
   * Olha documentacao no expo
   * Para fazer autenticacao com o google precisa entrar no console cloud
   * 1. criar um projeto
   * 2. passar 4 campos obrigatorios para obter os dados do usuario
   *  client id 
   *  redirect uri
   *  response type
   *  scope
   * 3. obter o tipo de resposta da url anterior
   * 4. obter os dados do usuario
   * 5. adicionar no estado e no storage.

   */
  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }
  useEffect(() => {
    /**
     * Pegar os dados do storage do celular
     * verificar se existe
     *  se existir pegue os dados e passe para o estado atual
     * Termina o loading do usuario atribuindo como falso
     */
    async function loadUserData(): Promise<void> {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage) as User;
        setUser(userLogged);
      }
      setUserLoading(false);
    }
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signOut, userLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };
