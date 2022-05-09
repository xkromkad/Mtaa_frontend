class WebSockt {
    static websocket = null;
    
    constructor() {
        this.sockt_this = null;
      }


    static getInstOfSockt() {
      if (WebSocketService.websocket) {
        return WebSockt.websocket;
      }
      else{
        WebSocketService.websocket = new WebSocketService();
        }
    }
  
  
    connect(Path) {
      
      this.socketRef = new WebSocket();
      this.socketRef.onmessage = e => {
        this.socketNewMessage(e.data);
      };
      this.socketRef.onerror = e => {
        console.log(e.message);
      };

      this.socketRef.onopen = () => {
        console.log("WebSocket is now  open !");
      };
     
      this.socketRef.onclose = () => {
        console.log("WebSocket is now closed !");
        this.connect();
      };
    }
  
    disconnect() {
      this.socketRef.close();
    }
  
    
  
    fetchMessages() {
      this.sendMessage({
       // json format of our message model
      });
    }
  
    newChatMessage(message) {
      this.sendMessage({
        // json format of our message model
      });
    }
  
    sendMessage(data) {
     
    this.sockt_this.send(JSON.stringify({ ...data }));
     
    }
  
  }