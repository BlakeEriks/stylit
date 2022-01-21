import CircularProgress from '@mui/material/CircularProgress';
import Fade from "@mui/material/Fade";
import MuiModal from "@mui/material/Modal";
import Btn from "components/Btn";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useModalState } from "utils/modal";

const Modal = () => {

  const [modalState, setModalState] = useModalState()
  const {open, title, description, type, options} = modalState

  return (
    <MuiModal
      open={!!open}
      onClose={() => setModalState({...modalState, open: false})}
      className="flex items-center justify-center"
      // closeAfterTransition
      // BackdropComponent={Backdrop}
      // BackdropProps={{
      //   timeout: 500,
      // }}
    >
      <Fade in={open}>
        <div className="bg-grey-700 p-5 rounded-xl w-[50vw]">
          {type === "loading" ?
            <CircularProgress /> :
            <>
              <h1 className="text-white text-3xl">
                {title}
              </h1>
              <p className="text-md text-grey-400 my-3">
                {description}
              </p>
              {type === "promptLogin" && 
                <div className="flex">
                  <Btn className="bg-sky-500 text-white">
                    Sign In with Google <FaGoogle className="text-xl ml-1 -mr-1" />
                  </Btn>
                  <Btn className="ml-2 bg-gold text-black">
                    Sign In with Github
                    <FaGithub className="text-2xl ml-1 -mt-1 -mr-1" />
                  </Btn>
                </div>
              }
              {type === "yesOrNo" &&
                <div className="flex flex-row justify-end w-full text-lg">
                  <Btn 
                    onClick={() => options?.onYes()}
                    className="rounded-2xl bg-green-500 text-white hover:shadow-lg mr-2"
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