import style from './Message.module.css'

interface propsType {
    Message: string;
    isError: boolean;
}

const Message = ({Message, isError}: propsType) => {
    return (
        <div className={style.MessageContainer}>
            <span className={isError ? style.ErrorMessage : style.SuccessMessage}>{Message}</span>
        </div>
    )
}

export default Message