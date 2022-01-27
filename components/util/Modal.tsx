import CircularProgress from '@mui/material/CircularProgress';
import Fade from "@mui/material/Fade";
import MuiModal from "@mui/material/Modal";
import Btn from "components/Btn";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useSocialAuth from 'utils/auth';
import { useModalState } from "utils/modal";

const Modal = () => {

  const [modalState, setModalState] = useModalState()
  const {open, title, description, type, options} = modalState
  const {signInWithGithub, signInWithGoogle} = useSocialAuth()

  const onLogin = async (action: () => Promise<void>) => {
    setModalState({open: true, type: "loading"})
    await action()
  }

  return (
    <MuiModal
      open={!!open}
      onClose={() => {if (type !== "loading") setModalState({...modalState, open: false})}}
      className="flex items-center justify-center box-content"
      closeAfterTransition
    >
      <Fade in={open}>
        <div className="flex flex-col items-center bg-grey-700 p-5 rounded-xl box-content transition-all duration-200">
          {type === "loading" ?
            <div className="w-full flex justify-center">
              <CircularProgress /> 
            </div>
            :
            <>
              <h1 className="text-white text-3xl">
                {title}
              </h1>
              <p className="text-md text-grey-400 my-3">
                {description}
              </p>
              {type === "promptLogin" && 
                <div className="flex">
                  <Btn className="bg-sky-500 text-white" onClick={() => onLogin(signInWithGoogle)}>
                    Sign In with Google <FaGoogle className="text-xl ml-1 -mr-1" />
                  </Btn>
                  <Btn className="ml-2 bg-gold text-black" onClick={() => onLogin(signInWithGithub)}>
                    Sign In with Github
                    <FaGithub className="text-2xl ml-1 -mt-1 -mr-1" />
                  </Btn>
                </div>
              }
              {type === "yesOrNo" &&
                <div className="flex text-lg">
                  <Btn 
                    onClick={() => options?.onYes()}
                    className="rounded-2xl bg-green-500 text-white hover:shadow-lg mr-5"
                  >
                    {options?.yesText ||  'Yes'}
                  </Btn>
                  <Btn 
                    onClick={() => options?.onNo()}
                    className="rounded-2xl bg-red text-white hover:shadow-lg"
                  >
                    {options?.noText || "No"}
                  </Btn>
                </div>
              }
            </>
          }
        </div>
      </Fade>
    </MuiModal>
  )
}

export default Modal