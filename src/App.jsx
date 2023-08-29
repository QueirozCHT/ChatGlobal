import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import "./App.css";
import { auth } from "./services/firebaseConfig";


export const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>ChatGlob</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
};

export const ChatRoom = () => {
  return <h1> ChatRoom </h1>;
};

export const SignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <button className="sign-in" onClick={() => signInWithGoogle()}> Conta Google 
    </button>
  );
};


export const SignOut = () => {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}> Sair 
      </button>
    )
  );
};    