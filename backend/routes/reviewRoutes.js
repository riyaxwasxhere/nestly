import express, { Router } from 'express'
import { createReview, getListingReviews } from '../controllers/reviewController.js'
import { isAuth } from '../middleware/isAuth.js'

const reviewRouter = Router()

reviewRouter.post('/create',isAuth, createReview)
reviewRouter.get('/getReviews/listing/:id', getListingReviews)

export default reviewRouter