"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import CreateMessage from "~/app/components/forms/create.message";
import MessageCard from "~/app/components/cards/message.card";

interface Message {
  id: number;
  content: string;
}

interface WriteSectionProps {
  messages: Message[];
}

export default function WriteSection({ messages }: WriteSectionProps) {
  const t = useTranslations("MessagesPage");
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  return (
    <div>
      <h3 className="mb-8 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-3xl text-center">
        {t("title")}
      </h3>
      {messages.length < 3 && <CreateMessage />}
      <div className="flex flex-wrap w-full justify-center sm:justify-baseline">
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            id={message.id}
            content={message.content}
            onCustomize={(content) => setSelectedMessage(content)}
          />
        ))}
      </div>
      <MessageInput onSend={(msg) => {}} selectedMessage={selectedMessage} />
    </div>
  );
}
