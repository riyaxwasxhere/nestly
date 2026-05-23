import express, { Router } from 'express'
import  {getSavedListings, removeSavedListing, saveListing} from '../controllers/savedController.js'

const savedRouter = Router()

savedRouter.post('/save', saveListing)
savedRouter.get('/listings/:userId', getSavedListings)
savedRouter.delete('/remove', removeSavedListing)

export default savedRouter