import { Header, Provider } from "@components";
import "@styles/global.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Header />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
