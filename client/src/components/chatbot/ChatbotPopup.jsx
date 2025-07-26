import { X } from "lucide-react";
import ChatbotUI from "./ChatbotUI"
import BaseModal from "../common/BaseModal";

const ChatbotPopup = ({ isOpen, onClose, courseId }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={"Ask Agent"} position={'bottom-right'}>
         <ChatbotUI courseId={courseId} />
    </BaseModal>
  );
};

export default ChatbotPopup;
