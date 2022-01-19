import { AuthProvider, GithubAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { useEffect } from 'react';
import Firebase from "./firebase";
import { useUserState } from './user';

const useSocialAuth = () => {

  const {setUser, resetUser} = useUserState()

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")!))
    }
  }, [])

  const signInWithSocial = (provider: AuthProvider) => Firebase.auth()
    .signInWithPopup(provider)
    .then(userCredential => {
      const user = JSON.parse(JSON.stringify(userCredential.user))
      setUser(user);
      window.localStorage.setItem("user", JSON.stringify(user))
    })
    .catch((err) => {
      console.log(err);
    });

  // sign out function
  const signOut = async () => {
    return Firebase.auth()
      .signOut()
      .then((res) => {
        resetUser()
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return {
    signInWithGithub: () => signInWithSocial(new GithubAuthProvider()),
    signInWithTwitter: () => signInWithSocial(new TwitterAuthProvider()),
    signOut
  }
};

export default useSocialAuth