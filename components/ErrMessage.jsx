import './ErrMessage.css'

export function ErrMessage({ message }) {
    return (
        <div className="error-message-container">Message!: {message}</div>
    )
}