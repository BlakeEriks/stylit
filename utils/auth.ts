import { AuthProvider, GithubAuthProvider, TwitterAuthProvider } from "firebase/auth";
import Firebase from "./firebase"

const useSocialAuth = () => {

  const signInWithSocial = (provider: AuthProvider) => Firebase.auth()
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res)
      return res.user
    })
    .catch((err) => {
      console.log(err);
      return err
    });

  return {
    signInWithGithub: () => signInWithSocial(new GithubAuthProvider()),
    signInWithTwitter: () => signInWithSocial(new TwitterAuthProvider())
  }
};

export default useSocialAuth