import { NextFunction, Request, Response } from 'express';
import {MessageType, WAConnection} from '@adiwajshing/baileys';
import qrcode from 'qrcode';
import fs from 'fs';
class IndexController {
  conn: WAConnection;

   constructor(){
    this.conn = new WAConnection();
    this.conn.on('chat-update',chatUpdate => {
      if (chatUpdate.messages && chatUpdate.count) {
        const message = chatUpdate.messages.all()[0]
        console.log (message)
    }
    });
    this.conn.loadAuthInfo('./auth_info.json');
    this.Runs()
  }
  async Runs(){
    console.clear();
    this.conn.connect();
  }

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    this.conn.on('qr', async qr=>{
      qrcode.toDataURL(qr, (err, url)=>{
        res.json({
          data : {
            qrcodeURL :url
          }
        })
      })
    });
    // this.conn.on('credentials-updated', () => {
    //   fs.writeFileSync('./BarBar.json', JSON.stringify(this.conn.base64EncodedAuthInfo(), null, '\t'))
    //   //info('2', 'Login Info Updated')
    // });
    //fs.existsSync('./BarBar.json') && this.conn.loadAuthInfo('./BarBar.json');
    this.conn.on('connecting', ()=>{
      console.log('Connecting');
    });
    this.conn.on('open',()=>{
      console.clear();
      const authInfo = this.conn.base64EncodedAuthInfo() 
      fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t'))
    });
    
    
    await this.conn.connect();
  };

  public sendMessage = async (req:Request, res:Response, next: NextFunction): Promise<void> =>{
    const {nomor, pesan} = req.body;
    const id = `${nomor}@s.whatsapp.net`;
    const sentMsg = await this.conn.sendMessage(id, pesan ,MessageType.text);
    const Message  = sentMsg.toJSON()
    console.log(Message.key);
  
    res.status(200).json({
      data : sentMsg
    })
    
  }
public loadMessage = async (req:Request, res:Response, next:NextFunction):Promise<void> =>{
  let message = []
  const messages = await this.conn.loadChats(3,null);
  for (let index = 0; index < messages.chats.length; index++) {
    message.push(messages.chats[index].messages)
  }
  res.status(200).json({
    message
  })
  
}
}

export default IndexController;
