import express from 'express'
import {getStatus } from './status/get.status'
import { getCities } from './cityData/get.city'

const router = express.Router()
// middleware
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
next() })
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
// api route
router.get('/api/status', getStatus)
// api route
router.get('/api/city',getCities)

export default router
