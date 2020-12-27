import { NextApiRequest, NextApiResponse } from 'next'


const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { pid } = req.query
  res.status(200).json({ Post: pid })
}

export default handler