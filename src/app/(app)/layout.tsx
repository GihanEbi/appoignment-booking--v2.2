import Footer from '@/components/UiComponents/Footer/Footer';
import Navbar from '@/components/UiComponents/Navbar/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatBot – AI on your site',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />       
      <main>{children}</main>
      <Footer/>
    </>
  );
}
