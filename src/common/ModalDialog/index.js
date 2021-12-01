import React,{useRef,useEffect} from 'react';
import './modalDialog.css'

const ModalDialog = (props) =>{
    const {showModal,setShowModal,title,body,footer} = props
    const ref = useRef();

    function useOnClickOutside(ref, handler) {
        useEffect(
          () => {
            const listener = (event) => {
              // Do nothing if clicking ref's element or descendent elements
              if (!ref.current || ref.current.contains(event.target)) {
                return;
              }
              handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
              document.removeEventListener("mousedown", listener);
              document.removeEventListener("touchstart", listener);
            };
          },
          [ref, handler]
        );
    }

    useOnClickOutside(ref, () => setShowModal(false));

    return(
        <div className="modal-container" tabIndex="-1" role="dialog" hidden={!showModal} ref={ref}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <span onClick={()=>setShowModal(!showModal)} className="close-icon">&times;</span>
                </div>

                <div className="modal-body" >
                    {body}
                </div>

                {
                    footer && 
                    <div className="modal-footer">
                        {footer}
                    </div>
                }
            </div>

        </div>
    )
}

export default ModalDialog