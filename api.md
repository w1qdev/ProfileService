POST http://localhost:3000/api/auth/register            (anyone)      ++
POST http://localhost:3000/api/auth/login               (anyone)      ++
GET  http://localhost:3000/api/users/:id                (admin/user)  +
GET  http://localhost:3000/api/users                    (admin)       +
POST http://localhost:3000/api/users/:id/block          (admin/user)  +
POST http://localhost:3000/api/users/:id/grant-admin    (admin)       +
