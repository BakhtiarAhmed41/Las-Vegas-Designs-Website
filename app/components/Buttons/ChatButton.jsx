import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function ChatButton() {
  return (
    <button className="p-5 rounded-full fixed bottom-3 right-5 bg-lv-blue-light transition-opacity duration-300 hover:opacity-80 cursor-pointer">
      <IoChatbubbleEllipsesOutline className="text-white font-semibold text-lg" />
    </button>
  );
}

export default ChatButton;
