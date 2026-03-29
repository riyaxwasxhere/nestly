import React from 'react'
import ConversationCard from './ConversationCard'

function MessageBox() {
  return (
    <div>
      <h2>💬 Messages</h2>
      <div>
        <div>
            <h3>Conversations</h3>
            <div>
                <ConversationCard/>
                <ConversationCard/>
                <ConversationCard/>
            </div>
        </div>
        <div>
            <div>
                <div>
                    <h3>Selected Conversation</h3>
                </div>
                <div>
                    messages will be shown here when a conversation is selected
                </div>
                <div>
               0     <input type="text" placeholder='Type your message here...' />
                    <button>Send</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
