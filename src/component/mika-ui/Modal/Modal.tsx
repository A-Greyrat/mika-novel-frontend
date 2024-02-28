import React, {memo, useCallback, useRef} from "react";
import './Modal.css';
import {createRoot} from "react-dom/client";
import {deepEqual} from "../utils";


export type ModalController = {
    // 仅执行关闭动画，不执行onClose
    close: () => void;
}

export type ModalProps = {
    visible: boolean;

    title?: React.ReactNode | string;
    content?: React.ReactNode | string;
    footer?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onOk?: () => unknown;
    onCancel?: () => unknown;
    onClose: () => unknown;
    closeOnClickMask?: boolean;
    showMask?: boolean;
    closeIcon?: boolean | React.ReactNode;
    modalController?: ModalController;
    position?: "top" | "center" | "bottom";
}

const fadeOutModal = (modalRef: React.RefObject<HTMLDivElement>) => {
    modalRef.current?.classList.add("mika-modal-closing");
    modalRef.current?.addEventListener("animationend", e => {
        if (e.animationName !== "mika-modal-fade-out") return;
        modalRef.current?.classList.remove("mika-modal-closing");
        modalRef.current?.classList.add("mika-modal-closed");
        modalRef.current?.classList.remove("mika-modal-lock");
        modalRef.current?.classList.remove("mika-modal-loading-ok");
        modalRef.current?.classList.remove("mika-modal-loading-cancel");
        modalRef.current?.classList.remove("mika-modal-loading-close");
    });
};

const closeModal = ({modalRef, onClose, type}: {
    modalRef: React.RefObject<HTMLDivElement>,
    onClose?: () => any,
    type?: "ok" | "cancel" | "close"
}) => {
    if (modalRef.current?.classList.contains("mika-modal-lock")) return;
    modalRef.current?.classList.add("mika-modal-lock");

    if (onClose) {
        const result = onClose();
        if (result instanceof Promise) {
            switch (type) {
                case "ok":
                    modalRef.current?.classList.add("mika-modal-loading-ok");
                    break;
                case "cancel":
                    modalRef.current?.classList.add("mika-modal-loading-cancel");
                    break;
                case "close":
                    modalRef.current?.classList.add("mika-modal-loading-close");
                    break;
            }
        }
    }
}

const Title = memo((props: { title: string | React.ReactNode }) => {
    if (props.title === undefined) return null;
    return typeof props.title === "string" ?
        <div className="mika-modal-title">{props.title}</div> : <>{props.title}</>;
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

const Footer = memo((props: {
    footer?: React.ReactNode | 'none';
    onOk?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    modalRef: React.RefObject<HTMLDivElement>;
}) => {
    const cancel = useCallback(() => {
        closeModal({modalRef: props.modalRef, onClose: props.onCancel, type: "cancel"});
    }, [props.modalRef, props.onCancel]);

    const ok = useCallback(() => {
        closeModal({modalRef: props.modalRef, onClose: props.onOk, type: "ok"});
    }, [props.modalRef, props.onOk]);

    if (props.footer === 'none') return null;
    else if (props.footer === undefined) return (<div className="mika-modal-footer">
        {!!props.onOk && <button className="mika-modal-btn mika-modal-btn-ok" onClick={ok}>确定</button>}
        {!!props.onCancel && <button className="mika-modal-btn mika-modal-btn-cancel" onClick={cancel}>取消</button>}
        {!!props.onClose &&
            <button className="mika-modal-btn mika-modal-btn-close" onClick={props.onClose}>关闭</button>}
    </div>);
    else return <>{props.footer}</>;
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

const Content = memo((props: { content: string | React.ReactNode }) => {
    if (props.content === undefined) return null;
    return typeof props.content === "string" ?
        <div className="mika-modal-content">{props.content}</div> : <>{props.content}</>;
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

const CloseIcon = memo((props: {
    closeIcon: boolean | React.ReactNode,
    onClose?: () => void
}) => {
    if (props.closeIcon === undefined || props.closeIcon === true)
        return <div className="mika-modal-close" onClick={props.onClose}></div>;
    return props.closeIcon === false ? null : <>{props.closeIcon}</>;
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

const Modal = React.forwardRef((props: ModalProps, ref: React.Ref<HTMLDivElement>) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const firstRender = React.useRef(true);
    React.useImperativeHandle(ref, () => modalRef.current!);

    const close = useCallback(() => {
        closeModal({modalRef, onClose: props.onClose, type: "close"});
    }, [props.onClose]);


    React.useEffect(() => {
        if (props.modalController) {
            props.modalController.close = () => fadeOutModal(modalRef);
        }

        if (props.visible) {
            modalRef.current?.classList.remove("mika-modal-closed");
            modalRef.current?.classList.add("mika-modal-opening");
            modalRef.current?.addEventListener("animationend", e => {
                if (e.animationName !== "mika-modal-fade-in") return;
                modalRef.current?.classList.remove("mika-modal-opening");
            });
        } else if (!firstRender.current) {
            fadeOutModal(modalRef);
        }

        modalRef.current?.style.setProperty('--mika-modal-Y', props.position === 'top' ? '-40vh' : props.position === 'bottom' ? '5vh' : '-50%');
    }, [modalRef, props.modalController, props.position, props.visible]);

    if (firstRender.current) {
        firstRender.current = false;
        if (!props.visible) return null;
    }

    return (<div className="mika-modal-wrap" ref={modalRef}>
            <div className="mika-modal-mask"
                 style={{display: props.showMask === undefined || props.showMask ? 'block' : 'none'}}
                 onClick={props.closeOnClickMask ? close : undefined}/>
            <div className='mika-modal-container' ref={ref}>
                <div className={"mika-modal" + (props.className ? ' ' + props.className : '')}
                     style={{...props.style}}>
                    <div className="mika-modal-header">
                        <Title title={props.title}/>
                        <CloseIcon closeIcon={props.closeIcon} onClose={close}/>
                    </div>
                    <Footer footer={props.footer} modalRef={modalRef} onOk={props.onOk} onCancel={props.onCancel}
                            onClose={close}/>
                    <Content content={props.content}/>
                </div>
            </div>
        </div>
    )
});

export const showModal = (props: Omit<ModalProps, 'visible'>) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const root = createRoot(div);

    const ModalWrapper = () => {
        const [visible, setVisible] = React.useState(true);
        const close = useCallback(() => {
            setVisible(false);
            setTimeout(() => {
                root.unmount();
                document.body.removeChild(div);
            }, 300);
        }, []);

        const oldOnClose = props.onClose;
        props.onClose = () => {
            const result = oldOnClose?.();
            if (result instanceof Promise) {
                return result.then(() => close());
            } else close();
        }

        if (props.onOk) {
            const oldOnOk = props.onOk;
            props.onOk = () => {
                const result = oldOnOk();
                if (result instanceof Promise) {
                    return result.then(() => close());
                } else close();
            }
        }

        if (props.onCancel) {
            const oldOnCancel = props.onCancel;
            props.onCancel = () => {
                const result = oldOnCancel();
                if (result instanceof Promise) {
                    return result.then(() => close());
                } else close();
            }
        }

        return <Modal {...props} visible={visible}/>
    }
    root.render(<ModalWrapper/>);
};

export const useModal = () => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const modalController = React.useMemo((): ModalController => ({
        close: () => {
            fadeOutModal(modalRef);
        }
    }), [modalRef]);

    return {modalRef, modalController};
};

export default React.memo(Modal, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});