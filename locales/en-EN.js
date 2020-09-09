import home from '@/static/website/pages/en-EN/home.json'
import shared from '@/static/website/pages/en-EN/shared.json'
import schema from '@/static/website/pages/en-EN/schema.json'
import portfolio from '@/static/website/pages/en-EN/portfolio.json'
import about from '@/static/website/pages/en-EN/me.json'
import brand from '@/static/website/pages/it-IT/brand.json'

const data = {
  home,
  shared,
  schema,
  portfolio,
  about,
  brand
}

export default () => {
  return new Promise(function (resolve) {
    resolve(data)
  })
}
