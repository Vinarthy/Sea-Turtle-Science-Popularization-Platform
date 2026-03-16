import { articles } from '../data/articles.js'

export function getArticles(req, res) {
  const { category, sub } = req.query

  let result = articles

  if (category) {
    result = result.filter((a) => a.category === category)
  }

  if (sub) {
    result = result.filter((a) => a.subCategory === sub)
  }

  const list = result.map((a) => ({
    id: a.id,
    title: a.title,
    cover: a.cover,
  }))

  res.json(list)
}

export function getArticleDetail(req, res) {
  const id = Number(req.params.id)

  const article = articles.find((a) => a.id === id)

  if (!article) {
    return res.status(404).json({ error: 'not found' })
  }

  res.json(article)
}
