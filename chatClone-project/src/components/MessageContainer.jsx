

const MessageContainer = ({ messages }) => {
    return (
      <div>
        {messages && Array.isArray(messages) ? (
          messages.map((m, index) => (
            <div key={index}>
              <div>{m.message}</div>
              <div>{m.user}</div>
            </div>
          ))
        ) : (
          <div>No messages to display</div>
        )}
      </div>
    );
  };
  
  export default MessageContainer;
  