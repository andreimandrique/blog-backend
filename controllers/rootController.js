const rootGet = (req, res) => {
  res.status(200).json({ message: "Welcome to my Blog Rest API!" });
};

export default rootGet;
