import { MessageType, WAConnection } from '@adiwajshing/baileys';

class WhatsappGenerator {
        conn:WAConnection;
        constructor(){
            this.controllers();
        }
        async controllers() {
         this.conn = new WAConnection();
         this.conn.on('qr',qr=>{
             console.log("Ini qrnya ya",qr);
         })
        
         await this.conn.connect();
         this.SendMessage();
    }
    async SendMessage(){
        const id = '+62895395214100@s.whatsapp.net';
        const sentMsg = await this.conn.sendMessage(id, 'haloooo',MessageType.text);
    }
       
}

export default WhatsappGenerator;