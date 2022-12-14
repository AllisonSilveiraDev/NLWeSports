import express from 'express'

import { PrismaClient} from '@prisma/client'

const app = express()

const prisma = new PrismaClient({
  log:['query']
})

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include:{
      _count:{
        select:{
          ads: true,
        }
      }
    }
  })

  return res.json(games)
});

app.post('/ads', (req, res) => {
  return res.status(201).json([])
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select:{
      id:true,
      name:true,
      weekDays:true,
      useVoiceChannel:true,
      yearsPlaying:true,
      hourStart:true,
      hourEnd:true,
    },
    where:{
      gameId: gameId
    },
    orderBy:{
      creatAt:'desc',
    }
  })

  return res.json(ads)
})

app.get('/ads/:id/discord', (req, res) => {
  //const adId = req.params.id;

  return res.json([])
})

app.listen(3333)
