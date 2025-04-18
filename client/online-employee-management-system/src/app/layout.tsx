import "./globals.css";
import RTKStoreProvider from "@/components/RTKStoreProvider/rtk-store-provider.component";
import BodyContainer from "@/components/BodyContainer/body-container.component";
import ChatBubble from "@/components/ChatBubble/chat-bubble.component";

export const metadata = {
  title: "Employee Verse",
  description:
    "Welcome to Employee Verse, an online employee management system!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RTKStoreProvider>
          <BodyContainer>{children}</BodyContainer>
          <ChatBubble />{" "}
        </RTKStoreProvider>
      </body>
    </html>
  );
}
