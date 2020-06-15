FROM 10.255.50.25:9090/library/basenode:v2
WORKDIR /user/home/tyacc-ms-gateway
COPY package.json .

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install --production 

COPY . /user/home/tyacc-ms-gateway
CMD [ "pm2-runtime", "start", "pm2config/ecosystem.config.js" ]
