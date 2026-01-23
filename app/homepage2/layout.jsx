import ChatButton from "../components/Buttons/ChatButton";
import GoUp from "../components/Buttons/GoUp";
import FooterSection from "../components/Footer/Footer2";
import Navbar from "../components/Navbar/Navbar2";
import TopTicker from "../components/TopPicker/TopPicker";

export const metadata = {
  title: "Las Vegas Designs",
  description: "Get your custom designs for Las Vegas-themed projects.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <TopTicker />
      <Navbar />
      {children}
      <FooterSection />
      <GoUp />
      <ChatButton />
    </>
  );
}
