import { NextApiRequest, NextApiResponse } from "next";
import { ComponentType } from 'utils/types';
import { connect } from "../../../utils/connection";
import { ResponseFuncs } from "../../../utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {

    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const query: {type?: ComponentType[], creator_id?: string} = {}
      if (req.query.type) {
        query.type = (req.query.type as string).split(',').map( 
          (componentType) => ComponentType[componentType as keyof typeof ComponentType]
        )
      }
      if (req.query.creatorId) {
        query.creator_id = req.query.creatorId as string
      }
      const { Component } = await connect() // connect to database
      res.json(await Component.find(query).catch(catcher))
    },

    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Component } = await connect() // connect to database
      res.json(await Component.create(req.body).catch(catcher))
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler