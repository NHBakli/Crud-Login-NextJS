import Navbar from "../components/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <main>
        <Navbar />
        {children}
      </main>
    </section>
  );
}
