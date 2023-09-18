import { addDoc, collection, orderBy, limit, query, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./App.css";
import { auth, databaseApp } from "./services/firebaseConfig";


export const App = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <h1>ChatGlobal</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );  
};

export const ChatRoom = () => {
  const dummy = useRef(); 
  const messageRef = collection(databaseApp, "messages");
  const QueryMessages = query(messageRef, orderBy("createdAt"), limit(50));
  const [messages] = useCollectionData(QueryMessages, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    const { photoURL, uid } = auth.currentUser;

    await addDoc(messageRef, {
      text: formValue,
      uid,
      photoURL,
      createdAt: serverTimestamp(),
    }); 
    setFormValue("");
    dummy.current.scrollIntoView({behavior: 'smooth'});
  };  
  
  return (
    <>
      <main>
        {messages &&
          messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
          <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input 
          type="text" 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button>Enviar</button>
      </form>
    </>
  );
};

export const ChatMessage = (props) => {
  const { text, photoURL, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received"; 

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
        <p>{text}</p>
    </div>
  );
};

export const SignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <button className="sign-in" onClick={() => signInWithGoogle()}>
      Login with Google
    </button>
  );
};

export const SignOut = () => {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sair
      </button>
    )
  );
};
