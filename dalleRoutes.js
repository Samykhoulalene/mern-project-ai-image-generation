import express from 'express'
import * as dotenv from 'dotenv'
import { OpenAI } from 'openai'

import Post from '../mongodb/models/post.js'

dotenv.config()

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
})



router.route('/').get((req, res) => {
    res.send("hello from open ai")
})


router.route('/').post(async(req, res) => {
    
        const { prompt } = req.body

        const aiResponse = await openai.createImage({
            model:"dalle",
            prompt,
            n: 1,
            size: '1024*1024',
            response_format: 'b64_json',
            quality:"standard",
  
        });

        

        const image = aiResponse.data.data[0].b64_json

        res.status(200).json({ photo: image })
    

})

export default router