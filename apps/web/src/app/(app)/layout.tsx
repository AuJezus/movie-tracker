import NavBar from "~/components/nav-bar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export default AppLayout;
