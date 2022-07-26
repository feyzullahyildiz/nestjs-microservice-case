FROM node:18-slim


ADD package.json package.json
# its package-lock.json is at the root level.
# So, docker does not allow us to copy that file here
# Actullay we need to use some other libaries like lerna-dockerize
RUN npm i

ADD . .

RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]