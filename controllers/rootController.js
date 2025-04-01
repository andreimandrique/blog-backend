const rootGet = (req, res) => {
    res.status(200).json({message: "Hello World!"});
}

export {rootGet};