var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);i.prototype=e.prototype,t.prototype=new i},GameObject=function(){function t(){this.shape=null,t.objects.push(this)}return t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.display=e},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t["delete"](),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t["delete"](),!1})},t.prototype["delete"]=function(){this.onDestroy(),this.shape&&(t.display.removeChild(this.shape),this.shape=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var ItemPower=function(t){function e(i,s,h){var a=t.call(this)||this;return a.speed=.8,a.text=null,a.state=a.stateFall,a.step=0,e.I=a,a.power=h,a.sizeW=BLOCK_SIZE_PER_WIDTH*Util.width,a.sizeH=.5*a.sizeW,a.setShape(i,s),a.text=Util.newTextField(Power[h],Util.width/24,15781888,a.shape.x/Util.width,a.shape.y/Util.height,!0),GameObject.display.addChild(a.text),a}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.text),this.text=null,e.I=null},e.prototype.setShape=function(t,e){null==this.shape?(this.shape=new egret.Shape,GameObject.display.addChild(this.shape)):this.shape.graphics.clear();var i=this.sizeW,s=this.sizeH;this.shape.x=t,this.shape.y=e,this.shape.graphics.lineStyle(3,15781888),this.shape.graphics.drawRect(i*-.5,s*-.5,i,s)},e.prototype.update=function(){this.state()},e.prototype.stateFall=function(){this.shape.y+=Player.I.speed*this.speed,this.text.x=this.shape.x-.5*this.text.width,this.text.y=this.shape.y-.5*this.text.height;var t=Player.I.shape.x-this.shape.x,e=Player.I.shape.y-this.shape.y;return Math.pow(t,2)+Math.pow(e,2)<=Math.pow(Player.I.radius+this.sizeW,2)?(Player.I.pickPower(this.power),this.state=this.stateEquipped,void(this.step=360)):void(this.shape.y>=Util.height+.5*this.sizeH&&this.destroy())},e.prototype.stateEquipped=function(){this.shape.x+=.5*(Player.I.shape.x-this.shape.x),this.shape.y+=.5*(Player.I.shape.y+Player.I.radius+.5*this.sizeH-this.shape.y),this.text.x=this.shape.x-.5*this.text.width,this.text.y=this.shape.y-.5*this.text.height,this.step--,this.step<=120&&(this.text.alpha=0!=(8&this.step)?1:.5,this.step<=0&&this.destroy())},e.I=null,e}(GameObject);__reflect(ItemPower.prototype,"ItemPower");var EffectCircle=function(t){function e(e,i,s,h,a,o){void 0===h&&(h=16760832),void 0===a&&(a=10),void 0===o&&(o=1.1);var r=t.call(this)||this;return r.radius=s,r.color=h,r.frame=r.period=a,r.scaler=o,r.setShape(e,i,r.radius),r}return __extends(e,t),e.prototype.setShape=function(t,e,i){null==this.shape?(this.shape=new egret.Shape,GameObject.display.addChild(this.shape)):this.shape.graphics.clear();var s=this.frame/this.period;this.shape.x=t,this.shape.y=e,this.shape.graphics.lineStyle(3+10*s,this.color),this.shape.graphics.drawCircle(0,0,i)},e.prototype.update=function(){return--this.frame<=0?void this.destroy():(this.radius*=this.scaler,void this.setShape(this.shape.x,this.shape.y,this.radius))},e}(GameObject);__reflect(EffectCircle.prototype,"EffectCircle");var PLAYER_POSITION_PER_HEIGHT=.75,PLAYER_RADIUS_PER_WIDTH=1/18,SHOT_RADIUS_PER_WIDTH=.025,BLOCK_IN_WIDTH=5,BLOCK_IN_HEIGHT=7,BLOCK_SIZE_PER_WIDTH=1/BLOCK_IN_WIDTH,BLOCK_SIZE_PER_HEIGHT=1/BLOCK_IN_HEIGHT,SCROLL_SPEED_PER_HEIGHT=1/60/3,SAVE_KEY_BESTSCORE="ShootUp-bestScore",Game=function(){function t(){}return t.loadSceneGamePlay=function(){new Background,new StartMessage,new Score,new Player,new Wave},t}();__reflect(Game.prototype,"Game");var Background=function(t){function e(){var e=t.call(this)||this;return e.shape=new egret.Shape,e.shape.graphics.beginFill(0),e.shape.graphics.drawRect(0,0,Util.width,Util.height),e.shape.graphics.endFill(),GameObject.display.addChild(e.shape),GameObject.display.setChildIndex(e.shape,1),e}return __extends(e,t),e.prototype.update=function(){},e}(GameObject);__reflect(Background.prototype,"Background");var GameOver=function(t){function e(){var e=t.call(this)||this;return e.textGameOver=null,e.textScore=null,e.textGameOver=Util.newTextField("GAME OVER",Util.width/10,15777792,.5,.45,!0),GameObject.display.addChild(e.textGameOver),e.textScore=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/12,15777792,.5,.55,!0),GameObject.display.addChild(e.textScore),Score.I.point>=Score.I.bestScore&&egret.localStorage.setItem(SAVE_KEY_BESTSCORE,Score.I.point.toFixed()),GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN,function(t){return e.touchBegin(t)},e),e}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.textGameOver),this.textGameOver=null,GameObject.display.removeChild(this.textScore),this.textScore=null},e.prototype.update=function(){},e.prototype.touchBegin=function(t){var e=this;GameObject.display.once(egret.TouchEvent.TOUCH_TAP,function(t){return e.tap(t)},this)},e.prototype.tap=function(t){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},e}(GameObject);__reflect(GameOver.prototype,"GameOver");var ItemAmmo=function(t){function e(e,i){var s=t.call(this)||this;return s.speed=1,s.radius=SHOT_RADIUS_PER_WIDTH*Util.width*1.75,s.setShape(e,i),s}return __extends(e,t),e.prototype.setShape=function(t,e){null==this.shape?(this.shape=new egret.Shape,GameObject.display.addChild(this.shape)):this.shape.graphics.clear(),this.shape.x=t,this.shape.y=e,this.shape.graphics.beginFill(15781888);var i=.4*this.radius;this.shape.graphics.drawCircle(i*-0,-1.4*i,i),this.shape.graphics.drawCircle(1.2*i,.6*i,i),this.shape.graphics.drawCircle(-1.2*i,.6*i,i),this.shape.graphics.endFill()},e.prototype.update=function(){return this.shape.y+=Player.I.speed*this.speed,this.speed+=.03,this.isPicked()?void Player.I.addAmmo():void this.isOutOfScreen()},e.prototype.isPicked=function(){var t=Player.I.shape.x-this.shape.x,e=Player.I.shape.y-this.shape.y,i=Math.pow(t,2)+Math.pow(e,2);if(i<=Math.pow(Player.I.radius+this.radius,2))return this.destroy(),!0;if(Player.I.power==Power.MAGNET){i=Math.sqrt(i);var s=1-Util.clamp(i/(.5*Util.width),0,1);this.speed+=(1-this.speed)*s,i=1/i*s*Util.width*.05,this.shape.x+=t*i,this.shape.y+=e*i}return!1},e.prototype.isOutOfScreen=function(){return this.shape.y>=Util.height+this.radius?(this.destroy(),!0):!1},e}(GameObject);__reflect(ItemAmmo.prototype,"ItemAmmo");var Block=function(t){function e(i,s,h){var a=t.call(this)||this;return a.animPeriod=5,a.animFrame=0,a.textHp=null,e.blocks.push(a),a.hp=h,a.sizeW=BLOCK_SIZE_PER_WIDTH*Util.width*.9,a.sizeH=BLOCK_SIZE_PER_HEIGHT*Util.height*.9,a.setShape(i,s),a.textHp=Util.newTextField(""+a.hp,Util.width/18,16777215,i/Util.width,s/Util.height,!0),GameObject.display.addChild(a.textHp),a}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;e.blocks=e.blocks.filter(function(e){return e!=t}),GameObject.display.removeChild(this.textHp),this.textHp=null},e.prototype.setShape=function(t,i){null==this.shape?(this.shape=new egret.Shape,GameObject.display.addChild(this.shape),GameObject.display.setChildIndex(this.shape,2)):this.shape.graphics.clear(),this.shape.x=t,this.shape.y=i,this.shape.graphics.beginFill(e.getColor(this.hp)),this.shape.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH),this.shape.graphics.endFill()},e.getColor=function(t){var i=Util.clamp((t-1)/(e.maxHp-1),0,1);return Util.colorLerp(16639,224,i)},e.prototype.update=function(){this.shape.y+=Player.I.speed,this.updateTextHp(),this.updateAnim(),this.updateCollisionPlayer(),this.updateOut()},e.prototype.updateTextHp=function(){this.textHp.text=""+this.hp.toFixed(),this.textHp.x=this.shape.x-.5*this.textHp.width,this.textHp.y=this.shape.y-.5*this.textHp.height},e.prototype.updateAnim=function(){if(this.animFrame>0){this.animFrame--;var t=1+.2*this.animFrame/this.animPeriod;this.shape.scaleX=this.shape.scaleY=t}},e.prototype.updateCollisionPlayer=function(){var t=Player.I.shape.x-this.shape.x,e=Player.I.shape.y-this.shape.y,i=Player.I.radius+.5*this.sizeW,s=Player.I.radius+.5*this.sizeH,h=Math.pow(t,2),a=Math.pow(e,2);h<Math.pow(i,2)&&a<Math.pow(s,2)&&(a>h&&e>0?Player.I.conflict(0,s-e+.2*Player.I.maxSpeed):Player.I.conflict((t>0?i:-i)-t,0))},e.prototype.updateOut=function(){this.shape.y>=Util.height+.5*this.sizeH&&this.destroy()},e.prototype.applyDamage=function(t){if(this.hp-=t,this.hp>0)this.animFrame=this.animPeriod,this.setShape(this.shape.x,this.shape.y);else{Score.I.breakBlock(),null!=ItemPower.I||0!=Util.randomInt(0,18)?new ItemAmmo(this.shape.x,this.shape.y):new ItemPower(this.shape.x,this.shape.y,Util.randomInt(Power.None+1,Power.Total-1)),this.destroy();var e=this.shape.x,i=this.shape.y,s=.5*this.sizeW;new EffectCircle(e,i,s)}},e.blocks=[],e.maxHp=15,e}(GameObject);__reflect(Block.prototype,"Block");var FallBlock=function(t){function e(e,i,s,h){var a=t.call(this,e,i,s)||this;return a.speed=0,a.speed=h,a.sizeW=BLOCK_SIZE_PER_WIDTH*Util.width*.9*1.25,a.sizeH=BLOCK_SIZE_PER_HEIGHT*Util.height*.9*1.25,a.setShape(e,i),a}return __extends(e,t),e.prototype.update=function(){this.shape.y+=Player.I.speed*this.speed,this.updateTextHp(),this.updateAnim(),this.updateCollisionPlayer(),this.updateOut()},e}(Block);__reflect(FallBlock.prototype,"FallBlock");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){GameObject.initial(this.stage),Util.init(this),Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this)},e.prototype.tickLoop=function(t){return GameObject.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var Power;!function(t){t[t.None=0]="None",t[t.SPREAD=1]="SPREAD",t[t.MAGNET=2]="MAGNET",t[t.FEVER=3]="FEVER",t[t.Total=4]="Total"}(Power||(Power={}));var Player=function(t){function e(){var i=t.call(this)||this;return i.maxSpeed=0,i.speed=0,i.ammo=0,i.textAmmo=null,i.shotLevelTable=[10,30,100],i.shotLevel=0,i.shotFrameTable=[15,10,5],i.shotFrame=0,i.power=Power.None,i.powerFrame=0,i.touch=!1,i.touchOffsetX=0,i.stopFlag=!1,i.state=i.stateNone,e.I=i,i.radius=PLAYER_RADIUS_PER_WIDTH*Util.width,i.setShape(.5*Util.width,Util.height*PLAYER_POSITION_PER_HEIGHT,i.radius),i.textAmmo=Util.newTextField(""+i.ammo,Util.width/18,0,i.shape.x/Util.width,i.shape.y/Util.height,!0),GameObject.display.addChild(i.textAmmo),GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(t){return i.touchBegin(t)},i),GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,function(t){return i.touchMove(t)},i),GameObject.display.stage.addEventListener(egret.TouchEvent.TOUCH_END,function(t){return i.touchEnd(t)},i),i}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;GameObject.display.removeChild(this.textAmmo),this.textAmmo=null,GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,function(e){return t.touchBegin(e)},this),GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,function(e){return t.touchMove(e)},this),GameObject.display.stage.removeEventListener(egret.TouchEvent.TOUCH_END,function(e){return t.touchEnd(e)},this),e.I=null},e.prototype.setShape=function(t,e,i){null==this.shape?(this.shape=new egret.Shape,GameObject.display.addChild(this.shape)):this.shape.graphics.clear(),this.shape.x=t,this.shape.y=e,this.shape.graphics.beginFill(15777792),this.shape.graphics.drawCircle(0,0,i),this.shape.graphics.endFill()},e.prototype.update=function(){this.state()},e.prototype.startRun=function(){this.state=this.stateRun,this.speed=this.maxSpeed=Util.height/150},e.prototype.stateRun=function(){if(this.shape.y>Util.height-this.radius)return this.state=this.stateNone,this.speed=0,void new GameOver;this.processPower(),this.stopFlag&&(this.stopFlag=!1,this.speed=.5*this.maxSpeed),this.speed+=Util.clamp(this.maxSpeed-this.speed,this.maxSpeed*-.1,.1*this.maxSpeed);var t=Util.height*(1/60/2);if(this.shape.y+=Util.clamp(PLAYER_POSITION_PER_HEIGHT*Util.height-this.shape.y,-t,t),this.touch&&--this.shotFrame<=0)switch(this.shotFrame=this.shotFrameTable[this.shotLevel],this.addAmmo(-1),this.power){default:case Power.None:new PlayerShot(this.shape.x,this.shape.y-this.radius,0);break;case Power.SPREAD:new PlayerShot(this.shape.x,this.shape.y-this.radius,0),new PlayerShot(this.shape.x,this.shape.y-this.radius,Math.PI*(1/16)),new PlayerShot(this.shape.x,this.shape.y-this.radius,Math.PI*(-1/16))}this.textAmmo.text=""+this.ammo,this.textAmmo.x=this.shape.x-.5*this.textAmmo.width,this.textAmmo.y=this.shape.y-.5*this.textAmmo.height},e.prototype.stateNone=function(){},e.prototype.touchBegin=function(t){this.state!=this.stateNone&&(this.touch=!0,this.touchOffsetX=this.shape.x-t.localX)},e.prototype.touchMove=function(t){this.state!=this.stateNone&&(this.touch=!0,this.shape.x=t.localX+this.touchOffsetX,this.shape.x=Util.clamp(this.shape.x,this.radius,Util.width-this.radius),this.touchOffsetX=this.shape.x-t.localX)},e.prototype.touchEnd=function(t){this.state!=this.stateNone&&(this.touch=!1)},e.prototype.conflict=function(t,e){this.shape.x+=t,this.shape.x=Util.clamp(this.shape.x,this.radius,Util.width-this.radius),this.shape.y+=e,this.touchOffsetX+=t,this.textAmmo.x=this.shape.x-.5*this.textAmmo.width,this.textAmmo.y=this.shape.y-.5*this.textAmmo.height,e>0&&(this.stopFlag=!0)},e.prototype.addAmmo=function(t){void 0===t&&(t=5),this.ammo=Util.clamp(this.ammo+t,0,999);for(var e=0;e<this.shotLevelTable.length&&(this.shotLevel=e,!(this.ammo<this.shotLevelTable[e]));e++);},e.prototype.pickPower=function(t){this.power=t},e.prototype.processPower=function(){var t=this;if(this.power!=Power.None){if(null==ItemPower.I)return void this.endPower();switch(this.power){default:break;case Power.FEVER:this.stopFlag=!1,this.shape.y+=.5*(PLAYER_POSITION_PER_HEIGHT*Util.height-this.shape.y),this.shape.scaleX=this.shape.scaleY=2+(7&ItemPower.I.step)/7,this.radius=PLAYER_RADIUS_PER_WIDTH*Util.width*2,this.maxSpeed=Util.height/60,Block.blocks.forEach(function(e){Math.pow(e.shape.y-t.shape.y,2)<Math.pow(.5*e.sizeH+t.radius,2)&&Math.pow(e.shape.x-t.shape.x,2)<Math.pow(.5*e.sizeW+t.radius,2)&&e.applyDamage(Block.maxHp)})}}},e.prototype.endPower=function(){this.power=Power.None,this.speed=this.maxSpeed=Util.height/150,this.shape.scaleX=this.shape.scaleY=1,this.radius=PLAYER_RADIUS_PER_WIDTH*Util.width,this.speed=this.maxSpeed=Util.height/150},e.I=null,e}(GameObject);__reflect(Player.prototype,"Player");var PlayerShot=function(t){function e(i,s,h){var a=t.call(this)||this;return e.shots.push(a),a.radius=SHOT_RADIUS_PER_WIDTH*Util.width,a.setShape(i,s,a.radius),a.vx=Math.sin(h)*a.radius*2,a.vy=-Math.cos(h)*a.radius*2,a}return __extends(e,t),e.prototype.onDestroy=function(){var t=this;e.shots=e.shots.filter(function(e){return e!=t})},e.prototype.setShape=function(t,e,i){null==this.shape?(this.shape=new egret.Shape,GameObject.display.addChild(this.shape)):this.shape.graphics.clear(),this.shape.x=t,this.shape.y=e,this.shape.graphics.beginFill(15777792),this.shape.graphics.drawCircle(0,0,i),this.shape.graphics.endFill()},e.prototype.update=function(){var t=this;this.shape.x+=this.vx,this.shape.y+=this.vy,Block.blocks.forEach(function(e){Math.pow(e.shape.y-t.shape.y,2)<=Math.pow(.5*e.sizeH+t.radius,2)&&Math.pow(e.shape.x-t.shape.x,2)<=Math.pow(.5*e.sizeW+t.radius,2)&&(e.applyDamage(1),t.destroy())}),(this.shape.y<0||Math.pow(this.shape.x-.5*Util.width,2)>=Math.pow(.5*Util.width+this.radius,2))&&this.destroy()},e.shots=[],e}(GameObject);__reflect(PlayerShot.prototype,"PlayerShot");var Score=function(t){function e(){var i=t.call(this)||this;i.point=0,i.bestScore=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("SCORE : 0",Util.width/22,15777792,.5,0,!0),GameObject.display.addChild(i.text);var s=egret.localStorage.getItem(SAVE_KEY_BESTSCORE);return null==s&&(s="50",egret.localStorage.setItem(SAVE_KEY_BESTSCORE,s)),i.bestScore=parseInt(s),i.textBest=Util.newTextField("BEST : "+s,Util.width/22,15777792,0,0,!0),GameObject.display.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.text),this.text=null,GameObject.display.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){this.text.text="SCORE : "+this.point.toFixed(),this.bestScore<this.point&&(this.bestScore=this.point,this.textBest.text="BEST : "+this.point.toFixed())},e.prototype.breakBlock=function(){this.point+=1},e.I=null,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var e=t.call(this)||this;return e.text=null,e.text=Util.newTextField("スワイプでボールを動かして\nブロックを打ち壊せ！",Util.width/18,15777792,.5,.4,!0),GameObject.display.addChild(e.text),GameObject.display.once(egret.TouchEvent.TOUCH_TAP,function(t){return e.tap(t)},e),e}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.text),this.text=null},e.prototype.update=function(){},e.prototype.tap=function(t){Player.I.startRun(),this.destroy()},e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");var Util=function(){function t(){}return t.init=function(t){this.height=t.stage.stageHeight,this.width=t.stage.stageWidth},t.random=function(t,e){return t+Math.random()*(e-t)},t.randomInt=function(t,e){return t=Math.floor(t),e=Math.floor(e)+.999,Math.floor(t+Math.random()*(e-t))},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var s=1-i,h=((16711680&t)*s+(16711680&e)*i&16711680)+((65280&t)*s+(65280&e)*i&65280)+((255&t)*s+(255&e)*i&255);return h},t.newTextField=function(e,i,s,h,a,o){var r=new egret.TextField;return r.text=e,r.bold=o,r.size=i,r.textColor=s,r.x=(t.width-r.width)*h,r.y=(t.height-r.height)*a,r},t}();__reflect(Util.prototype,"Util");var Wave=function(t){function e(){var e=t.call(this)||this;return e.scroll=0,e.wave=0,e.meteo=360,e.state=e.stateLine,e.step=0,e.route=0,e.map=null,e.mapIndex=0,e.map0=[0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,1,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0],e.map1=[0,0,0,0,0,0,0,1,0,0,0,1,1,1,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,1,1,1,0,0,0,1,0,0],e.map2=[1,0,0,0,1,1,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0],e.map3=[1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0],e.maps=[e.map0,e.map1,e.map2,e.map3],e}return __extends(e,t),e.prototype.update=function(){this.scroll+=Player.I.speed,this.state(),this.processMeteo()},e.prototype.calcBlockHp=function(){var t=Math.min(this.wave/16+3,Block.maxHp);return Util.clamp(Util.randomInt(.25*t,t),1,t)},e.prototype.processMeteo=function(){if(--this.meteo<=0){this.meteo=60*Util.random(.5,Util.clamp(15-this.wave/10,8,15));var t=BLOCK_SIZE_PER_WIDTH*Util.width,e=BLOCK_SIZE_PER_HEIGHT*Util.height*.5,i=Util.randomInt(1,BLOCK_IN_WIDTH-1),s=Math.min(this.wave/16+6,Block.maxHp);new FallBlock(.5*t+i*t,-e,s,0!=Util.randomInt(0,3)?2:.7)}},e.prototype.stateLine=function(){var t=Util.height*BLOCK_SIZE_PER_HEIGHT*2;if(this.scroll>=t){this.scroll-=t,this.wave++;var e=BLOCK_SIZE_PER_WIDTH*Util.width,i=BLOCK_SIZE_PER_HEIGHT*Util.height*.5;if(++this.step%2==0)for(var s=0;BLOCK_IN_WIDTH>s;s++)0!=Util.randomInt(0,2)&&new Block(.5*e+s*e,-i,this.calcBlockHp());else{var s=Util.randomInt(1,BLOCK_IN_WIDTH-1);new Block(.5*e+s*e,-i,this.calcBlockHp())}0==Util.randomInt(0,30)&&(this.state=this.stateRoute,this.scroll-=Util.height*BLOCK_SIZE_PER_HEIGHT*8)}},e.prototype.stateRoute=function(){var t=Util.height*BLOCK_SIZE_PER_HEIGHT*2;if(this.scroll>=t){this.scroll-=t,this.wave++;var e=BLOCK_SIZE_PER_WIDTH*Util.width,i=BLOCK_SIZE_PER_HEIGHT*Util.height*.5;this.route=Util.clamp(this.route+Util.randomInt(-2,2),0,BLOCK_IN_WIDTH-2);for(var s=0;BLOCK_IN_WIDTH>s;s++)s!=this.route&&s!=this.route+1&&new Block(.5*e+s*e,-i,this.calcBlockHp());0==Util.randomInt(0,30)&&this.setStateMap()}},e.prototype.setStateMap=function(){this.state=this.stateMap,this.map=this.maps[Util.randomInt(0,this.maps.length-1)],this.mapIndex=this.map.length/BLOCK_IN_WIDTH-1,this.scroll-=Util.height*BLOCK_SIZE_PER_HEIGHT*8},e.prototype.stateMap=function(){var t=Util.height*BLOCK_SIZE_PER_HEIGHT;if(this.scroll>=t){this.scroll-=t,this.wave++;for(var e=BLOCK_SIZE_PER_WIDTH*Util.width,i=BLOCK_SIZE_PER_HEIGHT*Util.height*.5,s=0;BLOCK_IN_WIDTH>s;s++)0!=this.map[this.mapIndex*BLOCK_IN_WIDTH+s]&&new Block(.5*e+s*e,-i,this.calcBlockHp());--this.mapIndex<0&&(0!=Util.randomInt(0,3)?this.setStateMap():(this.state=this.stateLine,this.scroll-=Util.height*BLOCK_SIZE_PER_HEIGHT*8))}},e}(GameObject);__reflect(Wave.prototype,"Wave");