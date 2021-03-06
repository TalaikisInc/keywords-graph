export const slugify = (text, done) => {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;&'
  const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh_______'
  const p = new RegExp(a.split('').join('|'), 'g')

  done(text.toString().toLowerCase()
    .replace(/\s+/g, '_')
    .replace(p, c =>
      b.charAt(a.indexOf(c)))
    .replace(/[^\w\-]+/g, '')
    .replace(/\_\_+/g, '_')
    .replace(/^_+/, '')
    .replace(/_+$/, ''))
}
