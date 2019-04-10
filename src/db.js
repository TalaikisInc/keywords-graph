const PROD = process.env.NODE_ENV === 'produciton'
const { resolve } = require('path')
const env = PROD ? resolve(__dirname, '../.env') : resolve(__dirname, '../.env.sample')
require('dotenv').config({ path: env })
const { strictEqual } = require('assert')
strictEqual(typeof process.env.NEO4J_PASSWORD, 'string', 'We need Neo4j password')
const neo4j = require('neo4j-driver').v1
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD))
const session = driver.session()
const { slugify } = require('./utils')

export const createCategory = (category) => {
  slugify(category, (id) => {
    if (id) {
      session
        .run('CREATE ({id}:Category { title : {category}, slug: {id} })', { id: id, category: category })
        .catch((error) => {
          console.error(error)
        })
    }
  })
}

export const createKeyword = (keyword) => {
  slugify(keyword, (id) => {
    if (id) {
      session.run('CREATE ({id}:Keyword { title : {keyword}, slug: {id}, hits: 0 })', { id: id, keyword: keyword })
        .catch((error) => {
          console.error(error)
        })
    }
  })
}

export const isIn = (keyword, category) => {
  slugify(keyword, (keywordId) => {
    if (keywordId) {
      slugify(category, (categoryId) => {
        if (categoryId) {
          session.run('MERGE ({keywordId})-[:IS_IN]->({categoryId})', { keywordId: keywordId, categoryId: categoryId })
            .catch((error) => {
              console.error(error)
            })
        }
      })
    }
  })
}

export const close = () => {
  session.close()
  driver.close()
}
