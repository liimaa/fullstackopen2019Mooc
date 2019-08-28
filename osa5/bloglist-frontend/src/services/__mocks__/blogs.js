const blogs = [
  {
    user: {
      username: 'Eemeli',
      name: 'Es',
      id: '5d444d2d93bd2a34183dced1'
    },
    title: 'Huono maailma',
    author: 'Fui Lei',
    url: 'https://example.com',
    likes: 17,
    id: '5d46ca05a690a02984472450'
  },
  {
    user: {
      username: 'Villi',
      name: 'Vs',
      id: '5d444d2d93bd2a34183dced1'
    },
    title: 'Sample text',
    author: 'Sampler',
    url: 'https://example.com',
    likes: 5,
    id: '5d46ca09a690a02984472451'
  },
  {
    user: {
      username: 'Jesse',
      name: 'Jes',
      id: '5d46e47ba69043565a44'
    },
    title: 'haw',
    author: 'haw',
    url: 'haw',
    likes: 27,
    id: '5d470b5fcd07f63a042697a9'
  },
]

let token = ''

const setToken = (usertoken) => {
  token = 'bearer ' + usertoken
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }