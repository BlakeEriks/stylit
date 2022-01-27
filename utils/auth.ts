import { AuthProvider, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from 'react';
import toast from "react-hot-toast";
import Firebase from "./firebase";
import { useModalState } from './modal';
import { useUserState } from './user';
var _ = require('lodash');

const useSocialAuth = () => {

  const {setUser, resetUser} = useUserState()
  const [modalState, setModalState] = useModalState()

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      setUser(JSON.parse(window.localStorage.getItem("user")!))
    }
  }, [])

  const signInWithSocial = (provider: AuthProvider) => Firebase.auth()
    .signInWithPopup(provider)
    .then( async (userCredential) => {
      
      const user = JSON.parse(JSON.stringify(userCredential.user))
      if (!user) {
        setModalState({open: false})
        toast.error("Failed to sign in.")
        return
      }

      let dbUser = await (await fetch(`/api/users?email=${user.email}`)).json()
      
      /* If user isn't in our system, create a new one */
      if (!dbUser.length) {
        dbUser = await (await fetch(`/api/users`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: user.email, displayName: user.displayName, photoURL: user.photoURL}),
        })).json()
      }
      else {
        dbUser = dbUser[0]
      }

      const combinedUserData = {id: dbUser._id, displayName: user.displayName, photoURL: user.photoURL}
      setUser(combinedUserData);
      setModalState({open: false})
      toast.success("Signed in to 💄stylit")
      window.localStorage.setItem("user", JSON.stringify(combinedUserData))
    })
    .catch((err) => {
      console.log(err)
      setModalState({open: false})
      toast.error("Failed to sign in.")
    });

  // sign out function
  const signOut = async () => {
    return Firebase.auth()
      .signOut()
      .then((res) => {
        resetUser()
        window.localStorage.removeItem("user")
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return {
    signInWithGithub: () => signInWithSocial(new GithubAuthProvider()),
    signInWithGoogle: () => signInWithSocial(new GoogleAuthProvider()),
    signOut
  }
};

export default useSocialAuth