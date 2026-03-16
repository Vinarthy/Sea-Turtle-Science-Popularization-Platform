import express from 'express'
import { getArticles, getArticleDetail } from './Controll/articleController.js'

const router = express.Router()

router.get('/', getArticles)

router.get('/:id', getArticleDetail)

export default router
