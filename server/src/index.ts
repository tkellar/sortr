import app from './app';

app.listen(process.env.SORTR_SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SORTR_SERVER_PORT}`);
});
