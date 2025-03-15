import { messageController } from "~/src/interface-adapters/controllers/message.controller";
import WriteSection from "~/app/[locale]/messages/write.section";

export default async function Index() {
  const pageData = await messageController.index();
  const messages = pageData.messages?.map((message) => {
    return {
      id: message.getId(),
      content: message.getContent(),
      createdAt: message.getCreatedAt(),
      updatedAt: message.getUpdatedAt(),
    };
  });
  
  return (
    <WriteSection messages={messages} />
  );
}