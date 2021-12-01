import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,
    models: {
      banners: Model,
    },
    seeds(server) {
      server.create('banner', {
        bannerColor: 'blue',
        bannerLink: 'https://codespark.com',
        bannerText: 'This is an awesome banner',
        bannerIcon: 'https://thefoos-com2.s3.amazonaws.com/flagship/icon_desktop.png',
        startDate: '2021-01-24T19:16:00.000Z',
        endDate: '2021-01-31T19:16:00.000Z'
      });
      server.create('banner', {
        bannerColor: 'orange',
        bannerLink: 'https://codespark.com',
        bannerText: 'This is another awesome banner',
        bannerIcon: '',
        startDate: '2021-02-01T20:14:00.000Z',
        endDate: '2021-02-07T20:14:00.000Z'
      });
      server.create('banner', {
        bannerColor: 'red',
        bannerLink: 'https://codespark.com',
        bannerText: 'This is the awesome banner',
        bannerIcon: '',
        startDate: '2021-03-01T19:04:00.000Z',
        endDate: '2021-03-05T19:04:00.000Z'
      });
    },

    routes() {
      this.namespace = 'api';
      this.get('/banners',(schema)=>{
        return schema.banners.all()
      })


      this.post("/banner",(schema,request)=>{
        let attrs = JSON.parse(request.requestBody)
          if(attrs.id){
            try{
              let updateBanner = schema.banners.find(attrs.id)
              delete attrs.id
              updateBanner.update(attrs)
              return {status: 'success', message: 'successfully Updated',response:schema.banners.all()}
            }catch(e){
              return {status: 'fail', message: e.message,response:schema.banners.all()}
            }
          }else{
            try{
              delete attrs.id
              schema.banners.create(attrs);
              return {status: 'success', message: 'successfully Added',response:schema.banners.all()}
            }catch(e){
              return {status: 'fail', message: e.message,response:schema.banners.all()}
            }
          }
      })

      this.delete('/banner/:id',(schema,request)=>{
        let id = request.params.id
        try{
          schema.banners.find(id).destroy()
          return {status: 'success', message: 'successfully deleted',response:schema.banners.all()}
        }catch(e){
          return {status: 'fail', message: e,response: []};
        }
      })
    }
  });
  return server;
}
