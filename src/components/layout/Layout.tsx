import Navbar from "../navbar/Navbar";

function Layout({ children }: { children: any }) {
  return (
    <div>
      <Navbar />
      <div className="main-content">{children}</div>
    </div>
  );
}

export default Layout;
