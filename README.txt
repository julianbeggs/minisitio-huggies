# pre-reqs
mongodb
node/npm

# setup application
git clone repo
npm install
mongod
node ./seed/seed-users.js
node ./seed/seed-products.js

# run app
npm start

# view on localhost:3000

----------------------------------

for production server setup nginx to proxy localhost:3000 to public server_ip:port

