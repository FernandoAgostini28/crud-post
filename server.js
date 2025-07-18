const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/api/posts', (req, res) => {
  const db = router.db;
  const posts = db.get('posts').value();

  const limit = parseInt(req.query.limit, 10) || 6;
  const lastPostId = req.query.lastPostId;

  let startIndex = 0;
  if (lastPostId) {
    const lastIndex = posts.findIndex((p) => String(p.id) === lastPostId);
    if (lastIndex !== -1) {
      startIndex = lastIndex + 1;
    }
  }

  const endIndex = startIndex + limit;
  const results = posts.slice(startIndex, endIndex);

  let nextLastPostId = 'final';
  if (endIndex < posts.length) {
    nextLastPostId = results[results.length - 1].id;
  }

  res.json({
    posts: results,
    lastPostId: nextLastPostId,
  });
});

server.use(router);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
