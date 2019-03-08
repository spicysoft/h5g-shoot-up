// Liberapp 2019 - Tahiti Katagai
// プレイヤー丸型

class Player extends GameObject{

    static I:Player = null;   // singleton instance

    radius:number;
    maxSpeed:number;
    speed:number;

    ammo:number = 0;
    readonly shotLevelTable:number[] = [20, 50, 100];
    shotLevel = 0;
    readonly shotFrameTable:number[] = [15, 10, 6];
    shotFrame:number = 0;
    touch:boolean = false;
    touchOffsetX:number = 0;
    stopFlag:boolean = false;

    constructor() {
        super();

        Player.I = this;
        this.radius = PLAYER_RADIUS_PER_WIDTH * Util.width;
        this.speed = this.maxSpeed = Util.height / (3 * 60);
        this.setShape(Util.width *0.5, Util.height * PLAYER_POSITION_PER_HEIGHT, this.radius);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
    }

    onDestroy(){
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => this.touchBegin(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => this.touchMove(e), this);
        GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => this.touchEnd(e), this);
        Player.I = null;
    }

    setShape(x:number, y:number, radius:number){
        if( this.shape == null ){
            this.shape = new egret.Shape();
            GameObject.display.addChild(this.shape);
        }
        else{
            this.shape.graphics.clear();
        }
        this.shape.x = x;
        this.shape.y = y;
        this.shape.graphics.beginFill(0xffc000);
        this.shape.graphics.drawCircle(0, 0, radius);
        this.shape.graphics.endFill();
    }
    
    update() {
        if( this.stopFlag ){
            this.stopFlag = false;
            this.speed = this.maxSpeed * 0.5;
        }

        this.speed += Util.clamp( this.maxSpeed - this.speed, 0, this.maxSpeed*0.1 );
        const yd = Util.height * (1/60/2);
        this.shape.y += Util.clamp( PLAYER_POSITION_PER_HEIGHT*Util.height - this.shape.y, -yd, yd );

        // shot
        if( this.touch ){
            if( (--this.shotFrame) <= 0 ){
                this.shotFrame = this.shotFrameTable[ this.shotLevel ];
                new PlayerShot( this.shape.x, this.shape.y - this.radius, 0 );
                new PlayerShot( this.shape.x, this.shape.y - this.radius, Math.PI * (+1/16) );
                new PlayerShot( this.shape.x, this.shape.y - this.radius, Math.PI * (-1/16) );
            }
        }
    }

    touchBegin(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        this.touch = true;
        this.touchOffsetX = this.shape.x - e.localX;
    }
    touchMove(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        this.touch = true;
        this.shape.x = e.localX + this.touchOffsetX;
        this.shape.x = Util.clamp( this.shape.x, this.radius, Util.width - this.radius );
        this.touchOffsetX = this.shape.x - e.localX;
    }
    touchEnd(e:egret.TouchEvent){
        if( this.deleteFlag )
            return;
        this.touch = false;
    }

    conflict(dx:number, dy:number){
        this.shape.x += dx;
        this.shape.x = Util.clamp( this.shape.x, this.radius, Util.width - this.radius );
        this.shape.y += dy;
        this.touchOffsetX += dx;
        if( dy > 0 ){
            this.stopFlag = true;
        }
    }

    eatDot(){
        this.ammo += 1;
    }
}
