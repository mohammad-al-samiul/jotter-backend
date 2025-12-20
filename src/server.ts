import app from "./app";

const startServer = async () => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();
