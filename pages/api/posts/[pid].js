


const handler = (req, res, { postData }) => {
  const { pid } = req.query
  res.status(200).json({ Post: pid })
}

export default handler